import React,{useContext} from 'react'
import {Helmet} from "react-helmet"
import {AppContext} from './App.jsx'

import './GraphiQlFooter.scss'

const GraphiQlFooter = ({activeTab})=>{
    const {state,dispatch} = useContext(AppContext)
    return(
        <>
            <div  className='graphiql-footer' >
                <div className="graphiql-footer-tabs">
                   <div className="item">
                     QUERY HEADERS
                   </div>
                </div>
                <div className="graphiql-footer-tabs-content">
                    {(!activeTab.footerTabActive || activeTab.footerTabActive === 1) &&
                        <div className='graphiql-footer-tab-headers'>
                            {activeTab.headers && activeTab.headers.map((item,index)=>
                                 <div className="header-item-wrapper" key={item.id}>
                                    <span className='close-item' onClick={()=>{dispatch({type:'REMOVE_ITEM_FROM_TAB_HEADERS',payload:activeTab.id,headerId:item.id})}}></span>
                                    <div className="header-item-input-wrapper">
                                        <input type="text" placeholder='Name...' onChange={(e)=>dispatch({type:'CHANGE_TAB_HEADER_VALUES',payload:activeTab.id,headerId:item.id,keyName:'name',value:e.target.value})} value={item.name}/>
                                    </div>
                                    <div className="header-item-input-wrapper">
                                        <input type="text" placeholder='Value...' onChange={(e)=>dispatch({type:'CHANGE_TAB_HEADER_VALUES',payload:activeTab.id,headerId:item.id,keyName:'value',value:e.target.value})} value={item.value}/>
                                    </div>
                                 </div>
                            )}
                            {(!activeTab.headers || activeTab.headers.length===0) &&
                             <div className="empty">No Headers!</div>
                            }
                        </div>
                    }
                </div>
                <Helmet>
                  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.min.css" rel="stylesheet" crossorigin="anonymous" />
                </Helmet>
                <div className='social-media--links'>
                  <div className={`social-media--wrapper ${(activeTab && activeTab.headers && activeTab.headers.length > 0) ? 'with-headers' : ''}`}>
                    <a
                      target='_blank'
                      href='https://github.com/Gherciu/graphiql-storm'
                    >
                      <span className="fa fa-github fa-2x" />
                    </a>
                    <a
                      target='_blank'
                      href='https://gherciu.github.io/'
                    >
                      <span className="fa fa-globe fa-2x" />
                    </a>
                  </div>
                </div>
            </div>
            {(!activeTab.footerTabActive || activeTab.footerTabActive === 1) &&
                <div className="add-tab-header" onClick={()=>dispatch({type:'ADD_TAB_HEADER',payload:activeTab.id})}>+</div>
            }
            </>
    )
}
export default GraphiQlFooter
