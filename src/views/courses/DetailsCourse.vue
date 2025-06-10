<template>
    <main class="main-details-course">
        <section class="section-details-course">

            <div class="div-category-course mb-4">
                <i class="bi bi-award"></i>
                <h2 class="category-course-title">{{ courseData.category }}</h2>
            </div>

            <div v-if="courseData">

                <div class="div-content-course">
                    <h1>{{ courseData.title }}</h1>
                    <p>{{ courseData.content }}</p>

                    <div class="text-center mt-4" v-if="!courseData.is_enrolled">
                        <button class="btn btn-primary btn-lg" @click="enrollInCourse">
                            <i class="bi bi-person-plus-fill me-2"></i> Quero me matricular
                        </button>
                    </div>

                    <!-- Se matriculado -->
                    <div v-else class="mt-5">
                        <h3 class="mb-4">Conteúdo do Curso</h3>

                        <div class="accordion w-100" id="modulesAccordion">
                            <div class="accordion-item" v-for="(module, moduleIndex) in courseData.modules" :key="module.id">
                                <h2 class="accordion-header" :id="`heading${module.id}`">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        :data-bs-target="`#collapse${module.id}`"
                                        aria-expanded="false"
                                        :aria-controls="`collapse${module.id}`"
                                    >
                                        <i class="bi bi-journal me-2"></i> Módulo {{ moduleIndex + 1 }}: {{ module.title }}
                                    </button>
                                </h2>

                                <div
                                    :id="`collapse${module.id}`"
                                    class="accordion-collapse collapse"
                                    :aria-labelledby="`heading${module.id}`"
                                    data-bs-parent="#modulesAccordion"
                                >
                                    <div class="accordion-body">
                                        <div v-for="lesson in module.lessons" :key="lesson.id" class="mb-4">
                                            <h5><i class="bi bi-book me-2"></i>{{ lesson.title }}</h5>

                                            <div v-for="content in lesson.contents" :key="content.id" class="mb-3 ms-3">
                                                <div v-if="content.content_type === 'TEXT'">
                                                    <p style="word-break: break-word;"><i class="bi bi-file-text me-2"></i>{{ content.text }}</p>
                                                </div>

                                                <div v-else-if="content.content_type === 'VIDEO'">
                                                    <a href="{{ content.video_url  }}">Link do video</a>
                                                    <br>
                                                    <iframe class="ratio ratio-16x9" 
                                                        :src="content.video_url" 
                                                        frameborder="0" 
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                        allowfullscreen 
                                                        width="700px" 
                                                        height="500px">
                                                    </iframe>
                                                </div>

                                                <div v-else>
                                                    <p>Conteúdo não suportado.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div v-else>Curso não encontrado</div>

        </section>
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { baseAPI } from '@/api/axios_api'
import { ref, onMounted } from 'vue'

const courseRoute = useRouter()
const courseId = courseRoute.currentRoute.value.params.slug
const courseData = ref({})

// GET COURSE DETAIL
onMounted(() => {
    fetchCourseDetail()
})

const fetchCourseDetail = () => {
    baseAPI.get(`/courses/${courseId}/`)
        .then(res => {
            courseData.value = res.data
            console.log('Course loaded')
        })
        .catch(err => {
            console.log('Erro ao buscar curso: ' + err)
        })
}

// ENROLL USER
const enrollInCourse = () => {
    baseAPI.post(`/courses/${courseId}/enroll/`)
        .then(() => {
            courseData.value.is_enrolled = true
            console.log('Matriculado com sucesso!')
        })
        .catch(err => {
            console.log('Erro ao se matricular: ' + err)
        })
}
</script>
