import axios from 'axios'
import { useAuthStore } from '@/store/auth'


const baseAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000/pt-br/api/v1/',
})

export async function refreshAccessToken() {
  const authStore = useAuthStore()

  if (!authStore.refreshToken) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await baseAPI.post('auth/token/refresh/', {
      refresh: authStore.refreshToken
    })
    const newAccessToken = response.data.access
    authStore.setAccessToken(newAccessToken)
    return newAccessToken
  } catch (error) {
    authStore.logout()
    throw error
  }
}

baseAPI.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }
  return config
})

baseAPI.interceptors.response.use(
  response => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await refreshAccessToken()
        return baseAPI(originalRequest)
      } catch (refreshError) {
        authStore.logout()
        window.location.href = '/user/login/'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export { baseAPI }
