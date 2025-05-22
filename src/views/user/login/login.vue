<template>

    <div class="text-center mb-3">
        <p>Sign in with:</p>

        <a data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="bi bi-google"></i>
        </a>
        <p class="text-center">or:</p>

    </div>
    <p>{{ errorMessage }}</p>
    <form @submit.prevent="loginFunction" class="form-control">

        <!-- Email input -->
        <div data-mdb-input-init class="form-outline mb-4">
            <label class="form-label" for="loginName">Email or username</label>
            <input type="text" class="form-control" v-model="userData.username"/>
        </div>

        <!-- Password input -->
        <div data-mdb-input-init class="form-outline mb-4">
            <label class="form-label" for="loginPassword">Password</label>
            <input type="password" id="loginPassword" class="form-control" v-model="userData.password"/>
        </div>

        <!-- 2 column grid layout -->
        <div class="row mb-4">
            <div class="col-md-6 d-flex justify-content-center">
            <div class="form-check mb-3 mb-md-0">
                <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                <label class="form-check-label" for="loginCheck"> Remember me </label>
            </div>
            </div>

            <div class="col-md-6 d-flex justify-content-center">
            <a href="#!">Forgot password?</a>
            </div>
        </div>

        <!-- Submit button -->
        <button type="submit" class="btn btn-primary">Login</button>

        <!-- Register buttons -->
        <div class="text-center">
            <RouterLink :to="{name: 'register'}" class="nav-link" >Register</RouterLink>
        </div>
        
    </form>

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
