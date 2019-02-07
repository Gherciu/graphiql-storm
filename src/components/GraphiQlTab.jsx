import React,{useRef,useContext,Component} from 'react'
import GraphiQL from 'graphiql'
import { parse, print } from 'graphql'
import graphQLFetcher from './../helpers/graphQlFetcher.jsx'
import GraphiQlSearch from './GraphiQlSearch.jsx'
import GraphiQlSettings from './GraphiQlSettings.jsx'
import GraphiQlWorkspaceManage from './GraphiQlWorkspaceManage.jsx'
import {AppContext} from './App.jsx'
import GraphiQlHistory from './GraphiQlHistory.jsx'
import toast from './../helpers/toast.jsx'

import 'graphiql/graphiql.css'
import './GraphiQlTab.scss'

let fetcherOnTick = null
let ticks = 0
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
    return(
        <div className='graphiql graphiql-tab'>
            <GraphiQL 
                fetcher={graphQLFetcher(activeTab.route || window.location.href,beforeFetch,afterFetch,onErrorFetch)}  
                onEditQuery={(e)=>dispatch({type:'CHANGE_TAB_QUERY',payload:activeTab.id,value:e})}
                onEditVariables={(e)=>dispatch({type:'CHANGE_TAB_VARIABLES',payload:activeTab.id,value:e})}
                editorTheme={activeTab.theme || 'dracula'}
                ref={ref =>graphiqlEditorRef = ref}     
                defaultQuery={activeTab.query || '# Write your query or mutation here'}
                query={activeTab.query || '# Write your query or mutation here'}
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
            </GraphiQL>
        </div>
    )
}
export default GraphiQlTab