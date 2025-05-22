import axios from 'axios'
import { useAuthStore } from '@/store/auth'
import { refreshAccessToken } from './refresh_token'

const baseAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000/pt-br/api/v1/',
})

let isRefreshing = false
let subscribers = []

function onTokenRefreshed(token) {
  subscribers.forEach(callback => callback(token))
  subscribers = []
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

// Interceptor de requisição
baseAPI.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Interceptor de resposta
baseAPI.interceptors.response.use(
  response => response,
  async error => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      authStore.refreshToken
    ) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise(resolve => {
          addSubscriber(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(baseAPI(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        const newToken = await refreshAccessToken()
        baseAPI.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        onTokenRefreshed(newToken)
        isRefreshing = false

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return baseAPI(originalRequest)
      } catch (err) {
        isRefreshing = false
        authStore.logout()
        window.location.href = '/user/login/'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export { baseAPI }
