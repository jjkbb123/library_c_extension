export const storageGet = (key) => {
    return localStorage.getItem(key)
}

export const storageSet = (key, value) => {
    return localStorage.setItem(key, value)
}