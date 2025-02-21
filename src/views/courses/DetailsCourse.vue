<template>

    <h1>Course Details</h1>

    <div v-if="courseData">

        <p>Id: {{ courseData.id }}</p>
        <p>Nome: {{ courseData.title }}</p>
        <p>Slug: {{ courseData.slug }}</p>

    </div>

    <div v-else>Curso não encontrado</div>

</template>

<script setup>

import { useRouter } from 'vue-router'
import { baseAPI } from '@/api/axios_api'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'


const courseRoute = useRouter()
const courseId = courseRoute.currentRoute.value.params.id
const store = useStore()
console.log(courseId)

const courseData = ref({})

onMounted(()=> {
    if(!store.state.isAuthenticated){
        router.replace({name: 'login'})
    }
    let token = store.state.token
    let config = {
        headers: {
            Authorization: 'Token ' + token,
        }
    }
    baseAPI.get(`v2/courses/${courseId}/`, config)
        .then(res => {

            courseData.value = res.data

            console.log('Courses API has received data')

        })

        .catch(err => {
            console.log('erro get courses API: ' + err)
        })
})

</script>