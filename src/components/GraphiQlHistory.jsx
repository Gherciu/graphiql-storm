import React,{useState,useContext,useEffect,useRef} from 'react'
import GraphiQL from 'graphiql'
import {AppContext} from './App.jsx'

import './GraphiQlHistory.scss'

const GraphiQlHistory = ({activeTab})=>{
    const {state,dispatch} = useContext(AppContext)
    let [dropdownOpen,openDropdown] = useState(false)   
    let dropdownRef = useRef(null)
    useEffect(()=>{
        const onClickOutsideDropdown = () => {
            if(dropdownOpen)
              openDropdown(false)
        }
        window.addEventListener('click',onClickOutsideDropdown)

        let allPreviews = document.querySelectorAll('.item-preview.item-preview-history')
            allPreviews.forEach((item,index)=>{
                let top = dropdownRef.getBoundingClientRect().top + window.scrollY;
                let left = dropdownRef.getBoundingClientRect().left + window.scrollX+255;
                item.style.top = `${top}px`
                item.style.left = `${left}px`
            })
        return () => {
            window.removeEventListener('click',onClickOutsideDropdown)
        }
    })
    const getQueryName = (query) => {
        return query.match(/\{\s*\w{1,}/ig)[0].match(/\w{1,}/ig)[0]
    }
    return(
        <div onClick={(e)=>{e.stopPropagation();openDropdown(!dropdownOpen)}} className='graphiql-history' >
            <GraphiQL.Button
                onClick={()=>{}}
                label="History"
            />
                <div className={`dropdown-container ${dropdownOpen?'active':''}`} ref={(ref)=>dropdownRef=ref}>
                    {state.history.map((item,index)=>
                        <div className='item-container' key={item.id}>
                            <div className='item' onClick={()=>dispatch({type:'ADD_TAB',payload:{...item}})}>
                                {getQueryName(item.query)}
                                <span className='close-item' onClick={(e)=>{e.stopPropagation();dispatch({type:'REMOVE_ITEM_FROM_HISTORY',payload:item.id})}}></span>
                            </div>
                            <div className="item-preview item-preview-history">
                                <pre>
                                    {item.query}
                                </pre>
                            </div>
                        </div>
                    )}
                    {state.history.length===0 &&
                      <div className="empty">No history!</div>
                    }
                </div> 
        </div>
    )
}
export default GraphiQlHistory