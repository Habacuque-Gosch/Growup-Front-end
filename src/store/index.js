import { baseAPI } from '@/api/axios_api';
// import { useRouter } from 'vue-router';
import { createStore } from 'vuex';


const token = localStorage.getItem('token')
const userData = []
// var router = useRouter()

async function request_user(){
    if(token){
        await baseAPI.get(`users/get-user-by-token/${token}/`)
        .then(response_user => {
            userData.value = response_user.data.results[0]
            return userData
        })
        .catch(error=> {
            console.log(error)
            return userData
        }
        )
    } else {
        console.log('token n existe')
        // router.replace({name: 'login'})
        return userData
    }

}

request_user()

const store = createStore({
    state: {
        messagesApp: [],
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: token,
        user: userData
    },

    getters: {
        
    },

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

    actions: {

    }
})

export default store