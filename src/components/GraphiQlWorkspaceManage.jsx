import React,{useState,useContext,useEffect} from 'react'
import {AppContext} from './App.jsx'

import './GraphiQlWorkspaceManage.scss'

const GraphiQlWorkspaceManage = ()=>{
    const {state,dispatch} = useContext(AppContext)
    let [dropdownOpen,openDropdown] = useState(false)   
    useEffect(()=>{
        const onClickOutsideDropdown = () => {
            if(dropdownOpen) 
              openDropdown(false)
        }
        window.addEventListener('click',onClickOutsideDropdown)
        return () => {
            window.removeEventListener('click',onClickOutsideDropdown)
        }
    })
    const importWorkspace = (e) => {
        let fr = new FileReader()
        fr.onload = (res) => {
             localStorage.setItem('__noBackend',res.target.result)
             dispatch({type:'SET_INITIAL_STATE',payload:JSON.parse(localStorage.getItem('__noBackend'))})
             openDropdown(false)
        }
        fr.readAsText(e.target.files[0])
    }

    const exportWorkspace = (event) => {
        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
          }
          download('workspace.no-backend',localStorage.getItem('__noBackend'))
          openDropdown(false)
    }
    return(
        <div onClick={(e)=>{e.stopPropagation();openDropdown(!dropdownOpen)}} className='graphiql-workspace-manage' >
            <svg  xmlns='http://www.w3.org/2000/svg' height='512' viewBox='0 -28 512 512'
            width='512'>
                <path d='m512 264c0 55.285156-42.148438 100.476562-96 106v-39.917969c31.726562-5.265625 56-32.886719 56-66.082031 0-36.945312-30.054688-67-67-67h-28v-35c0-67.269531-54.730469-122-122-122-62.785156 0-114.957031 47.019531-121.355469 109.375l-1.699219 16.566406-16.597656 1.328125c-42.25 3.382813-75.347656 39.28125-75.347656 81.730469 0 36.125 23.496094 66.835938 56 77.730469 4 1.9375 8 3.027343 12 3.269531v40c-2 0-7-1-12-1.804688-54.820312-11.945312-96-60.84375-96-119.195312 0-30.867188 11.554688-60.324219 32.53125-82.941406 17.171875-18.515625 39.371094-31.09375 63.6875-36.320313 6.808594-33.640625 24.1875-64.347656 49.914062-87.703125 29.851563-27.105468 68.515626-42.035156 108.867188-42.035156 87.878906 0 159.636719 70.332031 161.941406 157.660156 53.402344 5.960938 95.058594 51.375 95.058594 106.339844zm-177 114.714844v-166.714844h-40v166.714844l-21.859375-21.855469-28.28125 28.28125 70.140625 70.144531 70.140625-70.144531-28.28125-28.28125zm-76.859375-97.355469-70.140625-70.144531-70.140625 70.144531 28.28125 28.28125 21.859375-21.855469v167.214844h40v-167.214844l21.859375 21.855469zm0 0'
                fill='#9fa6ab' />
            </svg>
            {dropdownOpen &&
                <div className="dropdown-container">
                    <div className="item" onClick={e=>e.stopPropagation()}>
                        Import workspace
                        <input type="file" onChange={importWorkspace}/>
                    </div>
                    <div className="item" onClick={exportWorkspace}>
                        Export workspace
                    </div>
                </div> 
            }
        </div>
    )
}
export default GraphiQlWorkspaceManage