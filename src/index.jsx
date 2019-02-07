import React from 'react'
import {render} from 'react-dom'
import App from './components/App.jsx'

const renderGraphiQlStorm = (endpoints) => {
    document.body.innerHTML = ''
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
    render(<App endpoints={endpoints}/>,root)
}

export default renderGraphiQlStorm
