import { baseAPI } from '@/api/axios_api';


const token = localStorage.getItem('token')
const userData = []
// var router = useRouter()

async function request_user(){
    if(token){
        let config = {
            headers: {
                Authorization: 'Token ' + token,
            }
        }
        await baseAPI.get(`users/get-user-by-token/${token}/`, config)
        .then(response_user => {
            userData.value = response_user.data.results[0]
            return userData
        })
        .catch(error=> {
            // console.log(error)
            return userData
        }
        )
    } else {
        console.log('token n existe')
        return userData
    }

}

request_user()


export default {
    messagesApp: [],
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: token,
    user: userData
}