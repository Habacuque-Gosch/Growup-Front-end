<template>

    <h1>Criar curso</h1>
    <br>
    <form @submit.prevent="addCourse" class="form-control row g-2 pt-4 pb-4">

        <label class="form-label">Titulo</label>
        <input type="text" placeholder="Titulo do curso" v-model="newCourse.title" required style="height: 60px; border-radius: 5px;">
        <br>
        <label class="form-label">Slug</label>
        <input type="text" placeholder="Slug do curso" v-model="newCourse.slug" required style="height: 60px; border-radius: 5px;">

        <label class="form-label">Content</label>
        <textarea placeholder="Descrição do curso" v-model="newCourse.content" required style="height: 60px; border-radius: 5px;"></textarea>

        <button class="btn btn-success mt-4">Criar curso</button>
        <br>
        <p v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</p>

    </form>

</template>

<script>
import { ref } from 'vue';
import { baseAPI } from '@/api/axios_api'
import { useRouter } from 'vue-router';


export default {
    setup(){
        const newCourse = ref({title: '', slug: '', content: ''})
        const errorMessage = ref('')
        const router = useRouter()

        const addCourse = async () => {
            try {
                const response = await baseAPI.get('/courses/', {
                    params:{
                        title: newCourse.value.title,
                        slug: newCourse.value.slug,
                        description: '',
                    }
                })

                var courseExists = false
                response.data.title === newCourse.value.title || response.data.slug === newCourse.value.slug ? courseExists = true : courseExists = false

                if(courseExists){
                    errorMessage.value = 'Curso já existente'
                } else {
                    await baseAPI.post('/courses/', newCourse.value)
                    router.push({ name: 'index'})
                }

            }
            
            catch (error) {
                console.log(`ERRO AO CRIAR CURSO: ${error}`)
                errorMessage.value = `Erro ao criar o curso`
            }
        }

        return {
            newCourse,
            errorMessage,
            addCourse
        }
    }
}

</script>