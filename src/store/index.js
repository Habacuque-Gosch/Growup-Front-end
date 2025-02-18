import { createStore } from 'vuex';



const store = createStore({
    state: {
        messagesApp: [],
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token')
    },

    getters: {},

    mutations: {
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false
        }
    },

    actions: {}
})

export default store