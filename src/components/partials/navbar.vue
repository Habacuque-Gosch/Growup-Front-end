
<template>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" data-bs-theme="dark" v-if="isAuth">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">OpenKnowlodge</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <RouterLink to="/index/" class="nav-link active" >Início</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/index/" class="nav-link active" ><i class="bi bi-bell-fill"></i></RouterLink>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-fill"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <div v-if="isAuth">
                            <RouterLink to="/user/profile/" class="dropdown-item"><i class="bi bi-person"></i> Profile</RouterLink>
                            <RouterLink to="/user/profile/" class="dropdown-item"><i class="bi bi-kanban"></i> Cursos em andamento</RouterLink>
                            <RouterLink to="/user/profile/" class="dropdown-item"><i class="bi bi-gear"></i> Configurações</RouterLink>
                            <RouterLink to="/user/profile/" class="dropdown-item"><i class="bi bi-arrow-down-circle"></i> Atualizações</RouterLink>
                            <RouterLink to="/user/profile/" class="dropdown-item"><i class="bi bi-question-circle"></i> Central de ajuda</RouterLink>
                            <RouterLink to="/course/add-course" class="dropdown-item" ><i class="bi bi-lock"></i> Admin</RouterLink>
                            <a @click="logout()" class="dropdown-item"><i class="bi bi-arrow-left"></i> Sair</a>
                        </div>
                        <div v-else>
                            <RouterLink to="/user/login/" class="dropdown-item"><i class="bi bi-person-circle"></i> Login</RouterLink>
                            <RouterLink to="/user/register/" class="dropdown-item"><i class="bi bi-person-circle"></i> Register</RouterLink>
                        </div>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
import { baseAPI } from '@/api/axios_api'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const logout = () => {
  delete baseAPI.defaults.headers.common['Authorization']
  userStore.clearProfile()
  authStore.logout()
  router.replace({ name: 'login' })
}

const isAuth = authStore.isAuthenticated

</script>