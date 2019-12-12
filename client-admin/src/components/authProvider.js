export default {
    login: ({ username }) => {
        localStorage.setItem('username', username)
        return Promise.resolve()
    },

    logout: () => {
        localStorage.removeItem('username')
        return Promise.resolve()
    },

    checkError: ({status}) => {
        if(status === 401 || status === 403) {
            localStorage.removeItem('username')
            return Promise.reject()
        }
    },

    checkAuth: () => {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject()
    },

    getPermisions: () => Promise.resolve()
}