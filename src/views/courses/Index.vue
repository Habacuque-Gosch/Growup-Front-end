<script setup>
    import Search from '@/components/index_courses/search.vue';
</script>


<template>

    <main class="main-index-courses">

        <Search></Search>

        <div v-if="apiData != ''" class="div-list-courses">

            <div class="div-list-courses-item" v-for="course in apiData" :key="course.id">
                <div class="div-card-course">
                    <RouterLink :to="{name: 'course_details', params: {id: course.id}}">{{ course.title }}</RouterLink>
                    <p>{{ course.content }}</p>
                    <p>Duração: {{ course.duration }}H | Nível:  {{ course.level }} | Categoria: {{ course.category }}</p>

                    <div class="d-flex align-items-center gap-4 mt-4">
                        <RouterLink :to="{name: 'course_details', params: {id: course.id}}" class="btn btn-success mr-3"><i class="bi bi-eye"></i>Ver curso</RouterLink>
                        <!-- <RouterLink :to="{name: 'edit_course', params: {id: course.id}}" class="btn btn-primary"><i class="bi bi-pencil"></i>Editar curso</RouterLink>
                        <button @click="deleteCourse(course.id)" class="btn btn-danger"><i class="bi bi-trash"></i>Deletar curso</button> -->
                        <button @click="saveCourse(course.id)" class="btn btn-primary"><i class="bi bi-bookmark"></i>Salvar curso</button>
                    </div>

                </div>
            </div>
            
        </div>

        <div v-else>Nenhum curso encontrado</div>


    <ul class="pagination">
        <li v-if="currentPage > 1" class="page-item">
            <a class="page-link" @click="changePage(currentPage - 1)">Anterior</a>
        </li>
        <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
        </li>
        <li v-if="currentPage < pages.length" class="page-item">
            <a class="page-link" @click="changePage(currentPage + 1)">Próxima</a>
        </li>
    </ul>

    </main>

</template>

<script>
import { baseAPI } from '@/api/axios_api'
import { useUserStore } from '@/store/user'

const store = useUserStore()

export default {
    data() {
        return {
            apiData: [],
            countPage: 0,
            currentPage: 1,
            itemsPerPage: 20,
            profile_user: store.profile || null,
        }
    },
    computed: {
        pages() {
            const totalPages = Math.ceil(this.countPage / this.itemsPerPage)
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
    },
    methods: {
        async loadCourses(page = 1) {
            try {
                const response = await baseAPI.get(`/courses/?page=${page}`)
                this.apiData = response.data.results
                this.countPage = response.data.count
                this.currentPage = page
                this.itemsPerPage = response.data.results.length
            } catch (err) {
                console.error('Erro ao carregar cursos:', err)
            }
        },
        changePage(page) {
            if (page !== this.currentPage && page >= 1 && page <= this.pages.length) {
                this.loadCourses(page)
            }
        },
        async saveCourse(courseId) {
            try {
                const response = await baseAPI.post('profiles/save-course/', {
                    course_id: courseId
                })
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        },
        async deleteCourse(courseId) {
            try {
                const response = await baseAPI.delete(`courses/${courseId}/`)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
    },
    mounted() {
        this.loadCourses()
    }
}
</script>