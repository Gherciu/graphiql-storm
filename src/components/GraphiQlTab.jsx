import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { parse, print } from 'graphql';
import React, { useContext, useRef } from 'react';
import { ApolloConsumer, ApolloProvider } from 'react-apollo';
import graphQLFetcher from './../helpers/graphQlFetcher.jsx';
import toast from './../helpers/toast.jsx';
import { AppContext } from './App.jsx';
import GraphiQlFooter from './GraphiQlFooter.jsx';
import GraphiQlHistory from './GraphiQlHistory.jsx';
import GraphiQlSearch from './GraphiQlSearch.jsx';
import GraphiQlSettings from './GraphiQlSettings.jsx';
import './GraphiQlTab.scss';
import GraphiQlWorkspaceManage from './GraphiQlWorkspaceManage.jsx';

let fetcherOnTick = null
let ticks = 0
const getApolloClient = (activeTab)=>{
    //---------------------------apollo client setup 
    const cache = new InMemoryCache();
    const httpLink =  new HttpLink({
        uri: activeTab.route
    });
    const wsLink =new WebSocketLink({
        uri:activeTab.route.replace("http","ws").replace("https","ws"),
        reconnect: true
    });
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
        // split based on operation type
        ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
    );
    return new ApolloClient({
        link,
        cache
    });
    //--------------------------end apollo client setup
}
const GraphiQlTab = ({activeTab,endpoints})=>{

    const {state,dispatch} = useContext(AppContext)
    let graphiqlEditorRef = useRef(null)

    const prettifySchema = (event) => {
        const editor = graphiqlEditorRef.getQueryEditor();
        const currentText = editor.getValue();
        const prettyText = print(parse(currentText));
        editor.setValue(prettyText);
    }

    const beforeFetch = (graphQlParams) => {
        const execButton = document.querySelector('.execute-button-wrap > .execute-button')
        //if click multiple times on exec restart timer
        clearInterval(fetcherOnTick)
        execButton.innerHTML = ''
        execButton.classList.remove('timmer-red')
        execButton.classList.remove('timmer-active')
        ticks = 0
        //start timer
        execButton.classList.add('timmer-active')
        fetcherOnTick = setInterval(() => {
         if(ticks<360){//0.36 sec
            ticks++
            execButton.innerHTML = ((ticks % 60000) / 1000).toFixed(2)
         }else{
            ticks++
            execButton.innerHTML = ((ticks % 60000) / 1000).toFixed(2)
            execButton.classList.add('timmer-red')
            if(ticks>3000){
                clearInterval(fetcherOnTick)
                setTimeout(()=>{
                    execButton.innerHTML = ''
                    execButton.classList.remove('timmer-red')
                    execButton.classList.remove('timmer-active')
                    ticks = 0
                },3000)
            }
         }
        },1)
    }

    const afterFetch = (response) => {
        const execButton = document.querySelector('.execute-button-wrap > .execute-button')
        clearInterval(fetcherOnTick)
        execButton.innerHTML = ''
        execButton.classList.remove('timmer-red')
        execButton.classList.remove('timmer-active')
        ticks = 0
        if(response.data && !response.data.__schema){
            dispatch({type:'CHANGE_TAB_RESPONSE',payload:activeTab.id,value:JSON.stringify(response,null,2)})
            dispatch({type:'ADD_TO_HISTORY',payload:{...activeTab,id:new Date().getTime()}})
        }
        if(response.errors){
            dispatch({type:'CHANGE_TAB_RESPONSE',payload:activeTab.id,value:JSON.stringify(response,null,2)}) 
        }
    }

    const onErrorFetch = (error) => {
        console.log(error)
        const execButton = document.querySelector('.execute-button-wrap > .execute-button')
        execButton.innerHTML = ((ticks % 60000) / 1000).toFixed(2)
        clearInterval(fetcherOnTick)
        execButton.classList.add('timmer-red')
        setTimeout(()=>{
            execButton.innerHTML = ''
            execButton.classList.remove('timmer-red')
            execButton.classList.remove('timmer-active')
            ticks = 0
        },3000)
    }

    const copyCURL = () => {
        let curl = `curl '${activeTab.route || window.location.origin}' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: ${activeTab.route || window.location.origin}' --data-binary '{"query":${JSON.stringify(activeTab.query)}}' --compressed`
        if (!navigator.clipboard) {
            toast.info('Could not copy curl!')
        }else{
            navigator.clipboard.writeText(curl).then(function() {
                toast.info('Copying to clipboard was successful!');
            }, function(err) {
                toast.info('Could not copy curl: ', err);
            });
        }
    }
    //loader for subscriptions (necesar on each render)
    // if()
    //////////////////////////
    return(
        <ApolloProvider client={getApolloClient(activeTab)}>
            <ApolloConsumer>
                {(apolloClient)=>(
                <div className='graphiql graphiql-tab'>
                    <GraphiQL 
                        fetcher={graphQLFetcher(activeTab.route || window.location.href,activeTab.headers || [],beforeFetch,afterFetch,onErrorFetch,apolloClient,activeTab,dispatch,state)}  
                        onEditQuery={(e)=>dispatch({type:'CHANGE_TAB_QUERY',payload:activeTab.id,value:e})}
                        onEditVariables={(e)=>dispatch({type:'CHANGE_TAB_VARIABLES',payload:activeTab.id,value:e})}
                        editorTheme={activeTab.theme || 'dracula'}
                        ref={ref =>graphiqlEditorRef = ref}     
                        defaultQuery={activeTab.query || ''}
                        query={activeTab.query || ''}
                        response={activeTab.response || ''}
                        variables={activeTab.variables || ''}
                    >
                        <GraphiQL.Logo> <></> </GraphiQL.Logo>
                        <GraphiQL.Toolbar>
                            <GraphiQL.Button
                                onClick={prettifySchema}
                                label="Prettify"
                            />
                            <GraphiQlHistory activeTab={activeTab} />
                            <GraphiQlSearch activeTab={activeTab} endpoints={endpoints || []}/>
                            <GraphiQL.Button
                                onClick={()=>copyCURL()}
                                label="Copy CURL"
                            />
                            <GraphiQlWorkspaceManage />
                            <GraphiQlSettings />
                        </GraphiQL.Toolbar>
                        <GraphiQL.Footer>
                            <GraphiQlFooter activeTab={activeTab}/>
                        </GraphiQL.Footer>
                    </GraphiQL>
                </div>
                )}
            </ApolloConsumer>
        </ApolloProvider>
    )
}
export default GraphiQlTab