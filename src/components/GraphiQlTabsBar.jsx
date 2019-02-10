import React,{useContext,useState} from 'react'
import {AppContext} from './App.jsx'

import './GraphiQlTabsBar.scss'

const emojis = [
    '😁','😂','😃','😄','😅','😆','😉','😊','😋','😌','😍','😏','😒','😓','😔','😖','😘','😚','😱','😴','😎',
    '💪','👉','🤞','🤞','👌','👍','✍','👐','🙏','💅','👀','🙌','👋','🤜','✊','🖖',
    '🚀','🚃','🚄','🚅','🚇','🚉','🚌','🚏','🚑','🚒','🚓','🚕','🚗','🚚','🚢','🚤','🚨','🚲','🚧'
]
  
const GraphiQlTabsBar = ({})=>{
    let [dropdownActive,openDropdown] = useState(false)
    const {state,dispatch} = useContext(AppContext)
    const items = [...state.tabs]
    const focusInput = () => {
        openDropdown(true)
    }
    const blurInput = () => {
        setTimeout(()=>openDropdown(false),300)
    }
    return(
        <div className='graphiql-tabs-bar'>
           {items.map((item,index)=>
            <div key={item.id} className="graphiql-tab-item">
                <div className={`graphiql-tab-item-content ${item.active?'active':''}`}>
                    {item.active ?
                        <input onFocus={focusInput} onBlur={blurInput} id={`tabName${item.id}`} title='Click to change tab name'  className="graphiql-tab-item-title" type="text" onChange={(e)=>dispatch({type:'CHANGE_TAB_TITLE',payload:item.id,title:e.target.value})} placeholder={item.title || 'New tab'} value={item.title || ''} />
                        :
                        <div className="graphiql-tab-item-title" onClick={()=>dispatch({type:'ACTIVATE_TAB',payload:item.id})}>{item.title || 'New tab'}</div>
                    }
                    {dropdownActive && item.active &&
                     <div className="emoji-container">
                        {emojis.map((emoji,index)=>
                            <span key={index} onClick={(e)=>{e.stopPropagation();dispatch({type:'CHANGE_TAB_TITLE',payload:item.id,title:item.title?`${item.title}${emoji}`:emoji});openDropdown(false)}}>{emoji}</span>
                        )}
                     </div>
                    }
                    <div className="graphiql-tab-item-close" onClick={()=>dispatch({type:'REMOVE_TAB',payload:item.id})}></div>
                </div>
                {items.length === (index+1) && <div className="graphiql-tab-item-add" onClick={()=>dispatch({type:'ADD_TAB'})}>+</div>}
            </div>
           )}
        </div>
    )
}
export default GraphiQlTabsBar