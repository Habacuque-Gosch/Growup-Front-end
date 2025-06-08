
<template>

    <main class="main-home">

        <section class="section-home">

            <div class="logo-e-contexto">
                <img class="logo-home" src="" alt="">
                <p class="contexto-home">Encontre seu próximo projeto.</p>
            </div>

            <div class="botoes-login-ou-cadastro">

                <RouterLink :to="{name: 'register'}" class="botao-criar-conta">Register</RouterLink>
                <RouterLink :to="{name: 'login'}" class="botao-criar-conta" style="background-color: #1855ab00; color: #ffff; border: solid 1px #ffff; margin-bottom: 10px;">Login</RouterLink>

            </div>

            <div class="avisos">
                <p>Ao utilizar a OpenKnowlodge, você concorda com nossos <a href="">Termos de Serviço e Política de Privacidade.</a></p>
            </div>

        </section>

    </main>

</template>

<style scoped>

    .main-home {
        min-height: 100vh;
        min-width: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
    if (authStore.isAuthenticated) {
        router.replace({ name: 'index' })
    }
})

</script>

