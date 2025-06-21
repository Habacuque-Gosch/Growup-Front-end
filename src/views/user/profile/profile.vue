
<template>

    <div class="container py-4">
        <div class="card shadow-sm">
        <div class="card-body">
            <!-- Header do Perfil -->
            <div class="d-flex align-items-center mb-3">
            <div class="profile-avatar me-3">
                <img
                v-if="profile_data.photo"
                :src="profile_data.photo"
                alt="Foto do usuário"
                class="rounded-circle img-fluid"
                width="100px" />
                <div
                v-else
                class="profile-placeholder rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                >
                <h3 class="m-0">
                    {{ profile_data.name ? profile_data.name.charAt(0).toUpperCase() : "U" }}
                </h3>
                </div>
            </div>
            <div>
                <h2 class="mb-0">{{ profile_data.name }}</h2>
                <p class="text-muted mb-0">{{ profile_data.bio }}</p>
            </div>
            </div>

            <!-- Cursos Salvos -->
            <section>
                <RouterLink :to="{name: 'courses_saved'}" class="base-btn-forms" >Cursos salvos</RouterLink>
            </section>
        </div>
        </div>
    </div>

</template>

<script>
import { baseAPI } from '@/api/axios_api'
import { useUserStore } from '@/store/user'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        const userStore = useUserStore()
        const profile_data = userStore.profile

        return {
            profile_data
        }
    }
}
</script>