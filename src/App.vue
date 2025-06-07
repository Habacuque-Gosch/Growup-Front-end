<script setup>
    import Navbar from './components/partials/navbar.vue';
    import Footer from './components/partials/footer.vue';
    // import Notifications from './components/partials/notifications.vue';
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    const route = useRoute()
    const isAuthPage = computed(() => route.meta.isAuthPage)

</script>

<template>
    <Navbar></Navbar>
    <!-- <Notifications></Notifications> -->
    <RouterView :class="{ 'auth-wrapper': isAuthPage }" id="app"></RouterView>
    <Footer></Footer>

</template>

<style scoped>
    .auth-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
    }
</style>


