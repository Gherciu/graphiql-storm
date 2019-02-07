const toast = {
  info:(text) => {
    let node = document.createElement('div')
    node.classList.add('toast')
    node.classList.add('info')
    node.textContent = text 
    document.body.appendChild(node)
    setTimeout(()=>{document.body.removeChild(node)},3000)
  }
}

export default toast