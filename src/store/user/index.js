import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null
  }),
  actions: {
    setProfile(data) {
      this.profile = data
    },
    clearProfile() {
      this.profile = null
    }
  },
  persist: true
})
