
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
            <h4 class="mb-3">Cursos Salvos</h4>
            <div class="d-flex flex-wrap gap-3">
                <div
                    v-for="(curso, index) in coursesData"
                    :key="index"
                    class="curso-card p-3 border rounded flex-fill"
                    style="min-width: 150px; max-width: 30%; cursor: pointer;"
                    >
                    <div class="curso-content">
                        <h5 class="mb-2">{{ curso.title }}</h5>
                        <h6 class="mb-2">{{ curso.slug }}</h6>
                        <p class="mb-0 text-muted">Descrição do curso: {{ curso.content }}</p>
                    </div>
                </div>
            </div>
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
        const courses = profile_data.courses_save || []
        const coursesData = ref([])

        onMounted(async () => {
        if (courses.length > 0) {
            const idsParam = courses.join(',')
            try {
                const res = await baseAPI.get(`/courses/bulk/?ids=${idsParam}`)
                coursesData.value = res.data

            } catch (error) {
                console.error('Erro ao carregar cursos:', error)
            }
        }
        })

        return {
            profile_data,
            coursesData
        }
    }
}
</script>