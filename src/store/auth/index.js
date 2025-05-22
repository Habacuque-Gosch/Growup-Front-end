import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        refreshToken: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
    },
    actions: {
        login({ access, refresh }) {
        this.accessToken = access
        this.refreshToken = refresh
        },
        logout() {
        this.accessToken = null
        this.refreshToken = null
        },
        setAccessToken(token) {
        this.accessToken = token
        }
    },
    persist: true,
})
