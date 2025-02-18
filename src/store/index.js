import { baseAPI } from '@/api/axios_api';
import { createStore } from 'vuex';



const store = createStore({
    state: {
        messagesApp: [],
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
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