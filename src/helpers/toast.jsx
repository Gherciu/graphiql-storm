let activeToasts = 0
const toast = {
  info:(text) => {
    activeToasts++
    let container = document.getElementById('toast-container')
    if(!container){
      container = document.createElement('div')
      container.id = 'toast-container'
      document.body.appendChild(container)
    }
    let node = document.createElement('div')
    node.classList.add('toast')
    node.classList.add('info')
    node.textContent = text
    container.appendChild(node)
    setTimeout(()=>{
      activeToasts--
      container.removeChild(node)
      if(activeToasts===0)
        document.body.removeChild(container)
    },3000)
  }
}

export default toast