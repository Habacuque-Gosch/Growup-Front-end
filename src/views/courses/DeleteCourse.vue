<template>

    <h1>Delete Course</h1>
    <br>
    <p v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</p>

</template>

<script setup>


import { useRouter, useRoute } from 'vue-router'
import { baseAPI } from '@/api/axios_api'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'



const courseRoute = useRoute()
const router = useRouter()
const errorMessage = ref('')
const courseId = courseRoute.params.id
const store = useStore()

onMounted(()=> {
    if(!store.state.isAuthenticated){
        router.replace({name: 'login'})
    }
    baseAPI.get(`v2/courses/${courseId}/`)
    .then(response => {

        console.log('data: ', response.data.title)
        var token = store.state.token
        let config = {
            headers: {
                Authorization: 'Token ', token,
            }
        }
        baseAPI.delete(`courses/${courseId}/`, config)
        router.push({ name: 'index'})

    })

    .catch(error => {
        console.log(`ERRO AO DELETAR O CURSO: ${error}`)
        errorMessage.value = `Curso inexistente`
    })
})

</script>