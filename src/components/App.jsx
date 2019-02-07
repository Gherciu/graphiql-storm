import React,{useReducer,useEffect} from 'react'
import GraphiQlTab from './GraphiQlTab.jsx'
import registerLocalStorageNoBackendValues from './../helpers/registerLocalStorageNoBackendValues.jsx'
import GraphiQlTabsBar from './GraphiQlTabsBar.jsx'

import './App.scss'

let defaultTabValues = {active:true}
const initialState = {
    tabs:  [],
    settings:{
        syncWithLocalstorage:true,
        maxItemsInHistory:10
    },
    history:[]
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':{
            let newState = action.payload
            registerLocalStorageNoBackendValues(newState)
            return newState
        }
        case 'ADD_TAB':{
            let newStateTabs = [...state.tabs]
            newStateTabs = newStateTabs.map((item,index)=>{
                if(item.active){
                    return {...item,active:false}
                }
                return item
            })
            let newState = {}
            if(action.payload){
                newState = {...state,tabs:[...newStateTabs,{...action.payload,id:new Date().getTime(),...defaultTabValues}]}
            }else{
                newState = {...state,tabs:[...newStateTabs,{id:new Date().getTime(),...defaultTabValues}]}
            }
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'REMOVE_TAB':{
            let newStateTabs = [...state.tabs]
            if(newStateTabs.length>1){
                newStateTabs = newStateTabs.filter((item,index)=>{
                    return item.id !== action.payload
                })
            }
            if(newStateTabs.filter((item,index)=>item.active).length < 1){
             newStateTabs = newStateTabs.map((item,index)=>{
                 if(index === newStateTabs.length-1){
                     return {...item,active:true}
                 }
                 return item
             })
            }
            let newState = {...state,tabs:[...newStateTabs]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'ACTIVATE_TAB':{
            let newStateTabs = [...state.tabs]
            newStateTabs = newStateTabs.map((item,index)=>{
                if(item.id === action.payload){
                    return {...item,active:true}
                }else{
                    return {...item,active:false}
                }
            })
            let newState = {...state,tabs:[...newStateTabs]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'CHANGE_TAB_TITLE':{
            let newStateTabs = [...state.tabs]
            newStateTabs = newStateTabs.map((item,index)=>{
                if(item.id === action.payload){
                    return {...item,title:action.title}
                }
                return item
            })
            let newState = {...state,tabs:[...newStateTabs]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'CHANGE_TAB_QUERY':{
            let newStateTabs = [...state.tabs]
            newStateTabs = newStateTabs.map((item,index)=>{
                if(item.id === action.payload){
                    return {...item,query:action.value}
                }
                return item
            })
            let newState = {...state,tabs:[...newStateTabs]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'CHANGE_TAB_VARIABLES':{
            let newStateTabs = [...state.tabs]
            newStateTabs = newStateTabs.map((item,index)=>{
                if(item.id === action.payload){
                    return {...item,variables:action.value}
                }
                return item
            })
            let newState = {...state,tabs:[...newStateTabs]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'CHANGE_TAB_RESPONSE':{
            let newStateTabs = [...state.tabs]
            newStateTabs = newStateTabs.map((item,index)=>{
                if(item.id === action.payload){
                    return {...item,response:action.value}
                }
                return item
            })
            let newState = {...state,tabs:[...newStateTabs]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'CHANGE_TAB_ROUTE':{
            let newStateTabs = [...state.tabs]
            newStateTabs = newStateTabs.map((item,index)=>{
                if(item.id === action.payload){
                    return {...item,route:action.value}
                }
                return item
            })
            let newState = {...state,tabs:[...newStateTabs]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'STOP_SYNC_WITH_LOCALSTORAGE':{
           let newState = {...state,settings:{...state.settings,syncWithLocalstorage:!state.settings.syncWithLocalstorage}}
           registerLocalStorageNoBackendValues(newState)
           return  newState
        }
        case 'CHANGE_HISTORY_MAX_ITEMS':{
            let newState = {...state,settings:{...state.settings,maxItemsInHistory:action.payload}}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return  newState
        }
        case 'ADD_TO_HISTORY':{
            let newState = {...state}
            if(newState.history.length<state.settings.maxItemsInHistory){
                newState.history = [{...action.payload},...newState.history]
            }else{
                newState.history.pop()  
                newState.history = [{...action.payload},...newState.history]
            }
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        case 'REMOVE_ITEM_FROM_HISTORY':{
            let newStateHistory = [...state.history]
            newStateHistory = newStateHistory.filter((item,index)=>{
                return item.id !== action.payload
            })
            let newState = {...state,history:[...newStateHistory]}
            if(state.settings.syncWithLocalstorage){
                registerLocalStorageNoBackendValues(newState)
            }
            return newState
        }
        default:
            return state
    }
}

export const AppContext = React.createContext()
const App = ({endpoints})=>{
    const [state,dispatch] = useReducer(reducer,initialState)
    useEffect(()=>{
        defaultTabValues = {...defaultTabValues,route:endpoints[0].route}
        if(localStorage.getItem('__noBackend')){
           dispatch({type:'SET_INITIAL_STATE',payload:JSON.parse(localStorage.getItem('__noBackend'))})
        }else{
           dispatch({type:'SET_INITIAL_STATE',payload:{...initialState,tabs:[{id:new Date().getTime(),...defaultTabValues}]}})
        }
    },[])
    const activeTab = state.tabs.length>0 ? state.tabs.filter((item)=>item.active)[0] :null
    return(
        <>
            <AppContext.Provider value={{state,dispatch}}>
                <GraphiQlTabsBar />
                {activeTab &&
                    <GraphiQlTab endpoints={endpoints || []} activeTab={activeTab} />
                }
            </AppContext.Provider>
        </>
    )
}

export default App