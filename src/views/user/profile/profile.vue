
<template>

    <main class="form-control">
        <h1>Profile</h1>
        <div class="card">
            <div class="body-card">
                <img :src="`${user.value.photo_user}`" width="50px" height="50px">
                <p>{{ user.value.username }}</p>
                <p>{{ user.value.bio }}</p>
            </div>
        </div>
    </main>

</template>

<script>
import { baseAPI } from '@/api/axios_api'
import { useStore } from 'vuex';

export default {
    data() {
        const store = useStore()
        var user = store.state.user
        return {
            user
        }
    }
}
</script>