
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
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore()
        if(!store.state.usuario.isAuthenticated){
            router.replace({name: 'login'})
        }
        var user = store.state.usuario.user
        
        return {
            user
        }
    }
}
</script>