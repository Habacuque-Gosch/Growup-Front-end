<template>

<!-- <div class="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register"> -->

        <form @submit.prevent="createUser" class="form-control">
            <p>{{ errorMessage }}</p>
            <!-- Name input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="registerName">Digite seu nome completo</label>
                <input type="text" v-model="newUser.full_name" class="form-control" />
            </div>

            <!-- Username input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="registerUsername">Username</label>
                <input type="text" v-model="newUser.username" class="form-control" />
            </div>

            <!-- Email input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="registerEmail">Email</label>
                <input type="email" v-model="newUser.email" class="form-control" />
            </div>

            <!-- Password input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="registerPassword">Password</label>
                <input type="password" v-model="newUser.password" class="form-control" />
            </div>

            <!-- Repeat Password input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label">Repeat password</label>
                <input type="password" id="registerrepeatpassword" v-model="password_repeat" class="form-control" />
            </div>

            <!-- Checkbox -->
            <div class="form-check d-flex justify-content-center mb-4">
                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                aria-describedby="registerCheckHelpText" />
                <label class="form-check-label" for="registerCheck">
                I have read and agree to the terms
                </label>
            </div>

            <!-- Submit button -->
            <button class="btn btn-primary">Resgister account</button>
            
        </form>
<!-- </div> -->

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
