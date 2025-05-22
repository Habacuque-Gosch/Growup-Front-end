import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/user/home/index.vue'
import Login from '../views/user/login/login.vue'
import Register from '../views/user/register/register.vue'
import Profile from '../views/user/profile/profile.vue'

import { useAuthStore } from '../store/auth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/user/login/',
        name: 'login',
        component: Login,
    },
    {
        path: '/user/register/',
        name: 'register',
        component: Register,
    },
    {
        path: '/user/profile/',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true }
    },

    {
        path: '/index',
        name: 'index',
        component: () => import('../views/courses/Index.vue'),
    },
    {
        path: '/course/details/:id/',
        name: 'course_details',
        component: () => import('../views/courses/DetailsCourse.vue'),
    },
    {
        path: '/course/add-course/',
        name: 'add_course',
        component: () => import('../views/courses/AddCourse.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/course/edit-course/:id/',
        name: 'edit_course',
        component: () => import('../views/courses/EditCourse.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/course/delete-course/:id/',
        name: 'delete_course',
        component: () => import('../views/courses/DeleteCourse.vue'),
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
