import { baseAPI } from './axios_api'
import { useAuthStore } from '@/store/auth'

export async function refreshAccessToken() {
  const authStore = useAuthStore()

  if (!authStore.refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await baseAPI.post('/auth/token/refresh/', {
    refresh: authStore.refreshToken
  })

  const newAccessToken = response.data.access
  authStore.setAccessToken(newAccessToken)
  return newAccessToken
}
