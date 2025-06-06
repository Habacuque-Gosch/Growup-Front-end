<template>

    <main class="section-login-form">

        <form @submit.prevent="createUser" class="section-login-form">
            <p>{{ errorMessage }}</p>
            <div data-mdb-input-init class="form-group-fields">
                <label class="form-label-fields" for="registerName">Nome completo</label>
                <input type="text" class="field-user" placeholder="Digite seu nome completo" v-model="newUser.full_name"/>

                <label class="form-label-fields" for="registerUsername">Usuário</label>
                <input type="text" class="field-user" placeholder="Digite seu nome de usuário" v-model="newUser.username"/>

                <label class="form-label-fields" for="registerEmail">Email</label>
                <input type="email" class="field-user" placeholder="Digite seu email" v-model="newUser.email"/>
    
                <label class="form-label-fields" for="registerPassword">Senha</label>
                <input type="password" class="field-user" placeholder="Digite sua senha" v-model="newUser.password"/>

                <label class="form-label-fields">Confirmar senha</label>
                <input type="password" id="registerrepeatpassword" class="field-user" placeholder="Digite sua senha" v-model="password_repeat"/>
            </div>

            <button class="base-btn-forms">Criar conta</button>
            
        </form>
        
    </main>

</template>


<script setup>
import { ref } from 'vue'
import { baseAPI } from '@/api/axios_api'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const newUser = ref({
//   full_name: '',
  username: '',
  email: '',
  password: ''
})
const password_repeat = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

if (authStore.isAuthenticated) {
  router.replace({ name: 'index' })
}

const createUser = async () => {
  try {
    if (newUser.value.password !== password_repeat.value) {
      errorMessage.value = 'Senhas não são iguais'
      return
    }

    const payload = {
      username: newUser.value.username,
      email: newUser.value.email,
      password: newUser.value.password
    }

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${authStore.accessToken}`
    //   }
    // }

    await baseAPI.post('/register/', payload)

    router.push({ name: 'login' })

  } catch (error) {
    console.error('ERRO AO CRIAR USER:', error)
    errorMessage.value = 'Erro ao registrar-se'
  }
}
</script>

<style scoped>

    #app {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
    }

</style>

