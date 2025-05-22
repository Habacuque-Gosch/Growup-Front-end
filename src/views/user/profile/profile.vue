
<template>

    <main class="form-control">
        <h1>Profile</h1>
        <div class="card" v-if="user">
            <div class="body-card">
                <img :src="`${user.value.photo_user}`" width="50px" height="50px">
                <p>{{ user.value.username }}</p>
                <p>{{ user.value.bio }}</p>
            </div>
        </div>
        <p v-else>erro ao carregar informações do usuário</p>
    </main>

</template>

<script>
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    // Redireciona se não autenticado
    if (!userStore.isAuthenticated) {
      router.replace({ name: 'login' })
    }

    const user = userStore.user

    return {
      user
    }
  }
}
</script>