import React from 'react'
import {render} from 'react-dom'
import App from './components/App.jsx'

const graphiQlStorm = (endpoints) => {
    const root = document.createElement('div')
    root.id = 'root_graphiql-storm'
    document.body.appendChild(root)
    render(<App endpoints={endpoints}/>,root)
}

export default graphiQlStorm
