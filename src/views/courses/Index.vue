
<template>

    <main class="main-index-courses">
        <div>
            <form action="" class="" method="POST">
                <input type="text" name="palavra" id="palavra" class="form-control" placeholder="Pesquise pelo título, categoria ou descrição de um post" aria-label="Recipient's username" aria-describedby="button-addon2" required>
                <button class="btn btn-outline-secondary" id="button-addon2">Buscar </button>
            </form>
        </div>
        <hr>

        <div v-if="apiData != ''" class="div-list-courses">

            <div class="div-list-courses-item" v-for="course in apiData" :key="course.id">
                <div class="div-card-course">
                    <RouterLink :to="{name: 'course_details', params: {id: course.id}}">Nome do curso: {{ course.title }}</RouterLink>
                    <p>Link: {{ course.slug }}</p>
                    <RouterLink :to="{name: 'course_details', params: {id: course.id}}" class="btn btn-success"><i class="bi bi-eye"></i>Ver curso</RouterLink>
                    <RouterLink :to="{name: 'edit_course', params: {id: course.id}}" class="btn btn-primary"><i class="bi bi-pencil"></i>Editar curso</RouterLink>
                    <button @click="deleteCourse(course.id)" class="btn btn-danger"><i class="bi bi-trash"></i>Deletar curso</button>
                    <button @click="saveCourse(course.id)" class="btn btn-primary"><i class="bi bi-bookmark"></i>Salvar curso</button>
                </div>
            </div>
            
        </div>

        <div v-else>Nenhum curso encontrado</div>

    </main>

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

        async function deleteCourse(courseId) {

            try {
                const response = await baseAPI.delete(`courses/${courseId}/`)
                // successMessage.value = 'Curso salvo com sucesso!'
                console.log(response.data)
            } catch (error) {
                // errorMessage.value = 'Erro ao salvar curso.'
                console.error(error)
            }

        }

        return {
            apiData: [],
            profile_user,
            saveCourse,
            deleteCourse
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

<style scoped>
/* 
    .main-index-courses {

        width: 90%;
    } */

</style>