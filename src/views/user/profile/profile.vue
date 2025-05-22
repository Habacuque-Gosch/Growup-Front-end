
<template>

    <main class="form-control">
        <h1>Profile</h1>
        <div class="card" v-if="profile_data">
            <div class="body-card">
                    <img :src=url_photo width="50px" height="50px">
                    <p>{{ profile_data.name }}</p>
                    <p>{{ profile_data.bio }}</p>
                </div>
        </div>
        <p v-else>erro ao carregar informações do usuário</p>
    </main>

</template>

<script>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'
// import.meta.env.VITE_API_BASE_URL

export default {
    setup() {
        const userStore = useUserStore()
        const profile_data = userStore.profile

        const photo_user = computed(() => {
        if (!profile_data?.photo) return null
        return import.meta.env.VITE_API_BASE_URL + profile_data.photo
        })

        let url_photo = photo_user.value

        return {
            url_photo,
            profile_data
        }
    }
}
</script>