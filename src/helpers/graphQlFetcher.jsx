import gql from "graphql-tag";
import fetch from 'isomorphic-fetch';

const subscriptions = {}
const graphQLFetcher = (route,headers,beforeFetch,afterFetch,onErrorFetch,apolloClient,activeTab,dispatch,state) => {
    let newHeaders =  { 'Content-Type': 'application/json' }
    headers.forEach((item,index)=>{
        newHeaders[item.name] = item.value
    })
    return (graphQLParams)=> {
        //if is a subscription query
        if(new RegExp(/subscription\s{0,}\{/ig).test(graphQLParams.query)){
            return new Promise((resolve,reject)=>{
                let ctx = {...activeTab}
                if(subscriptions[ctx.id]){
                    dispatch({type:"LISTENING_TAB",payload:ctx.id,value:false})
                    subscriptions[ctx.id].unsubscribe();
                    subscriptions[ctx.id]= null;
                    let finalData = ctx.response || ""
                    setTimeout(()=>{dispatch({type:"CHANGE_TAB_RESPONSE",payload:ctx.id,value:finalData})},500)
                    resolve(JSON.parse(finalData))
                }else{
                    dispatch({type:"CHANGE_TAB_RESPONSE",payload:ctx.id,value:JSON.stringify({
                        receivedFromSubscription:["Listening..."]
                    },null,2)})
                    setTimeout(()=>{dispatch({type:"LISTENING_TAB",payload:ctx.id,value:true})},500)
                    subscriptions[ctx.id] = apolloClient.subscribe({
                        query:gql(ctx.query),
                        variables:graphQLParams.variables
                     }).subscribe({
                         next({data}){
                             if(data){
                                 let finalData = {...JSON.parse(ctx.response || {receivedFromSubscription:["Listening..."]})}
                                 finalData.receivedFromSubscription.push(data)
                                 resolve(finalData)
                                finalData = JSON.stringify(finalData,null,2)
                                 setTimeout(()=>{dispatch({type:"CHANGE_TAB_RESPONSE",payload:ctx.id,value:finalData})},1500)
                             }else{
                                dispatch({type:"LISTENING_TAB",payload:ctx.id,value:false})
                                subscriptions[ctx.id].unsubscribe();
                                subscriptions[ctx.id]= null;
                                dispatch({type:"CHANGE_TAB_RESPONSE",payload:ctx.id,value:JSON.stringify({
                                    "errors": [
                                      {
                                        "message": "Error:data is not defined!",
                                      }
                                    ]
                                  },null,2)})
                                 reject({
                                    "errors": [
                                      {
                                        "message": "Error:data is not defined!",
                                      }
                                    ]
                                  })
                             }
                         }
                    })
                }
            })
        }
        ////////////////////////////
        if(!new RegExp(/__schema/ig).test(graphQLParams.query)){
            beforeFetch(graphQLParams)
        }
        return fetch(route, {
            method: 'post',
            headers: newHeaders,
            body: JSON.stringify(graphQLParams),
        })
        .then(response => {
           return response.json()
        })
        .then(data=>{
            if(!new RegExp(/__schema/ig).test(graphQLParams.query)){
                afterFetch(data)
            }
            return data
        })
        .catch((error)=>{
            if(!new RegExp(/__schema/ig).test(graphQLParams.query)){
                onErrorFetch(error)
            }
            return error
        })
    }
}

export default graphQLFetcher