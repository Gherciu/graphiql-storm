import fetch from 'isomorphic-fetch'

const graphQLFetcher = (route,headers,beforeFetch,afterFetch,onErrorFetch) => {
    let newHeaders =  { 'Content-Type': 'application/json' }
    headers.forEach((item,index)=>{
        newHeaders[item.name] = item.value
    })
    return (graphQLParams)=> {
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
