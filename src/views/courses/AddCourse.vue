<template>

    <h1>Criar curso</h1>
    <br>
    <form @submit.prevent="addCourse" class="form-control row g-2 pt-4 pb-4">

        <label class="form-label">Titulo</label>
        <input type="text" placeholder="Titulo do curso" v-model="newCourse.title" required style="height: 60px; border-radius: 5px;">
        <br>
        <label class="form-label">Slug</label>
        <input type="text" placeholder="Slug do curso" v-model="newCourse.slug" required style="height: 60px; border-radius: 5px;">

        <label class="form-label">Creation</label>
        <input type="date" placeholder="Slug do curso" v-model="newCourse.creation" required style="height: 60px; border-radius: 5px;">

        <button class="btn btn-success mt-4">Criar curso</button>
        <br>
        <p v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</p>

    </form>

</template>

<script>
import { ref } from 'vue';
import { baseAPI } from '@/api/axios_api'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';



export default {
    setup(){
        const userCurrent = localStorage.getItem('user_id')
        const newCourse = ref({user: userCurrent, title: '', slug: '', creation: ''})
        const errorMessage = ref('')
        const router = useRouter()

        const store = useStore()

        if(!store.state.usuario.isAuthenticated){
            router.replace({name: 'login'})
        }

        const addCourse = async () => {
            try {
                const response = await baseAPI.get('v2/courses/1/', {
                    params:{
                        title: newCourse.value.title,
                        slug: newCourse.value.slug,
                        creation: newCourse.value.creation,
                    }
                })

                var courseExists = false
                response.data.title === newCourse.value.title || response.data.slug === newCourse.value.slug ? courseExists = true : courseExists = false

                if(courseExists){
                    errorMessage.value = 'Curso já existente'
                } else {
                    let config = {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        }
                    }
                    await baseAPI.post('v2/courses/', newCourse.value, config)
                    // console.log('requestss: ')
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