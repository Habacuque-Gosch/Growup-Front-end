
<template>

    <main class="form-control">
        <h1>Profile</h1>
        <div class="card" v-if="user.value">
            <div class="body-card">
                <img :src="`${user.value.photo_user}`" width="50px" height="50px">
                <p>{{ user.value.username }}</p>
                <p>{{ user.value.bio }}</p>
            </div>
        </div>
        <p v-else>user n encontrado</p>
        
    </main>

</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


export default {
    data(){
    const router = useRouter()
    const store = useStore()

    if(!store.state.isAuthenticated){
        router.replace({name: 'login'})
    }

    var user = store.state.user

    return {user}
    }
}
</script>