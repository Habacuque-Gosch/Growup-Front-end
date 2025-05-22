
<template>
    <h1 v-if="profile_user">Bem vindo(a) {{ profile_user.name }}</h1>
    <h1 v-else>Bem vindo(a)</h1>
    <div>
        <form action="" class=" input-group mb-3 d-flex flex-row bd-highlight mb-3" method="POST">

            <input type="text" name="palavra" id="palavra" class="form-control" placeholder="Pesquise pelo título, categoria ou descrição de um post" aria-label="Recipient's username" aria-describedby="button-addon2" required>
            <button class="btn btn-outline-secondary" id="button-addon2">Buscar </button>

        </form>
    </div>
    <hr>

    <h2>Cursos</h2>

    <div v-if="apiData != ''">

        <div class="card" v-for="course in apiData" :key="course.id">
            <div class="card-body">
                <RouterLink :to="{name: 'course_details', params: {id: course.id}}">Nome do curso: {{ course.title }}</RouterLink>
                <p>Link: {{ course.slug }}</p>
                <RouterLink :to="{name: 'course_details', params: {id: course.id}}" class="btn btn-success"><i class="bi bi-eye"></i>Ver curso</RouterLink>
                <RouterLink :to="{name: 'edit_course', params: {id: course.id}}" class="btn btn-primary"><i class="bi bi-pencil"></i>Editar curso</RouterLink>
                <RouterLink :to="{name: 'delete_course', params: {id: course.id}}" class="btn btn-danger"><i class="bi bi-trash"></i>Deletar curso</RouterLink>
                <button @click="saveCourse(course.id)" class="btn btn-primary"><i class="bi bi-bookmark"></i>Salvar curso></button>
            </div>
        </div>

    </div>

    <div v-else>Nenhum curso encontrado</div>

</template>

<script>
import { baseAPI } from '@/api/axios_api'
import { useUserStore } from '@/store/user'

const store = useUserStore()
// const loading = ref(false)
// const successMessage = ref('')
// const errorMessage = ref('')

export default {
    data() {
        let profile_user = store.profile || null

        async function saveCourse(courseId) {
            // loading.value = true
            // successMessage.value = ''
            // errorMessage.value = ''

            try {
                const response = await baseAPI.post('profiles/save-course/', {
                course_id: courseId
                })
                // successMessage.value = 'Curso salvo com sucesso!'
                console.log(response.data)
            } catch (error) {
                // errorMessage.value = 'Erro ao salvar curso.'
                console.error(error)
            }
            // finally {
            //     // loading.value = false
            // }
        }

        return {
            apiData: [],
            profile_user,
            saveCourse
        }
    },
    mounted() {

        baseAPI.get('/courses/')
        .then(res => {
            this.apiData = res.data.results
        })
        .catch(err => {
            console.log('erro get courses API: ' + err)
        })
    }
}
</script>