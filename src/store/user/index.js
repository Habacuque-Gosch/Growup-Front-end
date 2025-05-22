import { defineStore } from 'pinia'
import { baseAPI } from '@/api/axios_api'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null
  }),
  actions: {
    fetchUserProfile() {
        baseAPI.get('profiles/me/')
        .then(res => {
            let profile_user = res.data
            this.profile = profile_user
        })
        .catch(err => {
            console.log('erro get profile user: ' + err)
        })
    },
    clearProfile() {
      this.profile = null
    }
  },
  persist: true
})
