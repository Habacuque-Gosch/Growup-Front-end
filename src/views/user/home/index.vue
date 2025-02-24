
<script setup>

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore()
const router = useRouter()


if(store.state.usuario.isAuthenticated){
    router.replace({name: 'index'})
}

</script>


<template>

    <main class="form-control">
        <h1>Home</h1>
        <RouterLink :to="{name: 'register'}" class="btn btn-primary">Register</RouterLink>
        <br>
        <RouterLink :to="{name: 'login'}" class="btn btn-success">Login</RouterLink>

    </main>

</template>


