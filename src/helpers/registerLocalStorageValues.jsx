const registerLocalStorageNoBackendValues = (value) => {
    localStorage.setItem('__noBackend',JSON.stringify(value))
}

export default registerLocalStorageNoBackendValues