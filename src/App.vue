<script setup>
    // import { useStore } from 'vuex';
    // import { baseAPI } from './api/axios_api';
    import { mapState } from 'vuex';
    import Navbar from './components/partials/navbar.vue';
    import Notifications from './components/partials/notifications.vue';
    

    // const state = mapState
    
    // const isAuth = store.state.usuario.isAuthenticated
    // const token_auth_teste = store.state.usuario.token
    
</script>

<template>
    <Navbar></Navbar>
    <Notifications></Notifications>
    <main class="container mt-4" id="app">

        <!-- <RouterLink to="/">Início</RouterLink> -->
        <RouterView></RouterView>

    </main> 

</template>

<style>

</style>


