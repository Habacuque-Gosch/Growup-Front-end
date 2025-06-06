<template>

    <main class="section-login-form">

        <form @submit.prevent="createUser" class="section-login-form">
            <p>{{ errorMessage }}</p>
            <div data-mdb-input-init class="form-group-fields">
                <label class="form-label-fields" for="registerName">Digite seu nome completo</label>
                <input type="text" class="field-user" v-model="newUser.full_name"/>

                <label class="form-label-fields" for="registerUsername">Username</label>
                <input type="text" v-model="newUser.username" class="field-user"/>

                <label class="form-label-fields" for="registerEmail">Email</label>
                <input type="email" v-model="newUser.email" class="field-user"/>
    
                <label class="form-label-fields" for="registerPassword">Password</label>
                <input type="password" v-model="newUser.password" class="field-user"/>

                <label class="form-label-fields">Repeat password</label>
                <input type="password" id="registerrepeatpassword" v-model="password_repeat" class="field-user"/>
            </div>

            <div class="form-check d-flex justify-content-center mb-4">
                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                aria-describedby="registerCheckHelpText" />
                <label class="form-check-label" for="registerCheck">
                I have read and agree to the terms
                </label>
            </div>

            <button class="base-btn-forms">Resgister account</button>
            
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
