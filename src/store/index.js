import { baseAPI } from '@/api/axios_api';
import { createStore } from 'vuex';


const token = localStorage.getItem('token')
const userData = []

async function request_user(){
    await baseAPI.get(`users/get-user-by-token/${token}/`)
    .then(response_user => {
        userData.value = response_user.data.results[0]
        return userData
    })
}
// .catch()

request_user()

const store = createStore({
    state: {
        messagesApp: [],
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: token,
        user: userData
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