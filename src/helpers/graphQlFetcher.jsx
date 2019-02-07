import fetch from 'isomorphic-fetch'

const graphQLFetcher = (route,beforeFetch,afterFetch,onErrorFetch) => {
    return (graphQLParams)=> {
        if(!new RegExp(/__schema/ig).test(graphQLParams.query)){
            beforeFetch(graphQLParams)
        }
        return fetch(route, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
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