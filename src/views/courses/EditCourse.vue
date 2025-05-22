<template>

    <h1>Editar curso</h1>
    <br>
    <form @submit.prevent="editCourse" class="form-control row g-2 pt-4 pb-4">

        <label class="form-label">Editando {{ editCourseData.title }}</label>
        <input type="text" placeholder="Titulo do curso" v-model="editCourseData.title" required style="height: 60px; border-radius: 5px;">
        <br>
        <label class="form-label">Slug</label>
        <input type="text" placeholder="Slug do curso" v-model="editCourseData.slug" required style="height: 60px; border-radius: 5px;">

        <label class="form-label">Content</label>
        <input type="text" placeholder="Content do curso" v-model="editCourseData.content" required style="height: 60px; border-radius: 5px;">

        <button class="btn btn-success mt-4">Salvar alterações</button>
        <br>
        <p v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</p>

    </form>

</template>

<script>
import { ref, onMounted } from 'vue'
import { baseAPI } from '@/api/axios_api'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const editCourseData = ref({ title: '', slug: '', content: '' })
    const errorMessage = ref('')
    const router = useRouter()
    const courseRoute = useRoute()
    const courseId = courseRoute.params.id

    const DataCourseEdit = ref({ id: '', title: '', slug: '', content: '', user: null })

    onMounted(async () => {
      try {
        const response = await baseAPI.get(`/courses/${courseId}/`)
        DataCourseEdit.value = response.data
        editCourseData.value = {
          title: response.data.title,
          slug: response.data.slug,
          content: response.data.content,
        }
      } catch (error) {
        console.log('Erro ao carregar curso:', error)
        errorMessage.value = 'Curso inexistente'
        router.push({ name: 'index' })
      }
    })

    const editCourse = async () => {
      try {

        await baseAPI.patch(`/courses/${courseId}/`, editCourseData.value)
        router.push({ name: 'index' })
      } catch (error) {
        console.log(`Erro ao editar o curso:`, error)
        if (error.response?.data?.slug) {
            errorMessage.value = error.response.data.slug
        } else {
            errorMessage.value = 'Erro ao editar o curso'
        }
      }
    }

    return {
      editCourseData,
      DataCourseEdit,
      errorMessage,
      editCourse,
    }
  },
}
</script>