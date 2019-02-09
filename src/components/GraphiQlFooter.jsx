import React,{useContext} from 'react'
import {AppContext} from './App.jsx'

import './GraphiQlFooter.scss'

const GraphiQlFooter = ({activeTab})=>{
    const {state,dispatch} = useContext(AppContext)
    return(
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
                                 <div className="header-item-wrapper">
                                    <div className="header-item-input-wrapper">
                                        <input type="text" placeholder='Name...'/>
                                    </div>
                                    <div className="header-item-input-wrapper">
                                        <input type="text" placeholder='Value...'/>
                                    </div>
                                 </div>
                            )}
                            {(!activeTab.headers || activeTab.headers.length===0) &&
                             <div className="empty">No Headers!</div>
                            }
                            <div className="add-tab-header">+</div>
                        </div>
                    }
                </div>
            </div>
    )
}
export default GraphiQlFooter