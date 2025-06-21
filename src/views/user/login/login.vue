<template>

    <main class="section-login-form">

        <div class="logo-e-contexto">
            <img src="/assets/id_app/logo.svg" alt="">
            <p class="contexto-home">OpenKnowlodge</p>
        </div>
        <p>{{ errorMessage }}</p>
        <form @submit.prevent="loginFunction" class="section-login-form mt-5">

            <div class="form-group-fields">
                <label class="form-label-fields" for="loginName">Email</label>
                <input type="text" class="field-user" placeholder="Digite seu email" v-model="userData.username"/>

                <label class="form-label-fields" for="loginPassword">Senha</label>
                <input type="password" class="field-user" placeholder="Digite sua senha" id="loginPassword" v-model="userData.password"/>
            </div>

            <button type="submit" class="base-btn-forms">Entrar</button>
            
        </form>

        <div class="d-flex mt-4 flex-column align-items-center">
            <RouterLink :to="{name: 'register'}" class="" >Esqueceu a senha?</RouterLink>
            <RouterLink :to="{name: 'register'}" class="" >Cadastrar</RouterLink>
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
