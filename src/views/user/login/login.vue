<template>

    <main class="section-login-form">

        <!-- <div class="text-center mb-3">
            <p>Sign in with:</p>

            <a data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                <i class="bi bi-google"></i>
            </a>
            <p class="text-center">or:</p>

        </div> -->
        <p>{{ errorMessage }}</p>
        <form @submit.prevent="loginFunction" class="section-login-form">

            <div class="form-group-fields">
                <label class="form-label-fields" for="loginName">Email or username</label>
                <input type="text" class="field-user" placeholder="Digite seu email" v-model="userData.username"/>

                <label class="form-label-fields" for="loginPassword">Password</label>
                <input type="password" class="field-user" placeholder="Digite sua senha" id="loginPassword" v-model="userData.password"/>
            </div>

            <button type="submit" class="base-btn-forms">Entrar</button>
            
        </form>

        <div class="d-flex mt-4 flex-column align-items-center">
            <RouterLink :to="{name: 'register'}" class="" >Forget password?</RouterLink>
            <RouterLink :to="{name: 'register'}" class="" >Register</RouterLink>
        </div>

    </main>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { baseAPI } from '@/api/axios_api'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'


const userData = ref({ username: '', password: '' })
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(() => {
    if (authStore.isAuthenticated) {
        router.replace({ name: 'index' })
    }
})
const loginFunction = async () => {
    try {
        
        const response = await baseAPI.post('/login/', {
            email: userData.value.username, 
            password: userData.value.password
        })
        const { access, refresh } = response.data

        if (access && refresh) {
            authStore.login({ access, refresh })
            userStore.fetchUserProfile()
            router.replace({ name: 'index' })
        } else {
            errorMessage.value = 'Tokens não recebidos.'
        }
    } catch (error) {
        errorMessage.value = 'Usuário ou senha incorretos.'
    }
}

</script>
