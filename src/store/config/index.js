import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    theme: 'dark',
    language: 'pt-br'
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme
    },
    setLanguage(lang) {
      this.language = lang
    }
  },
  persist: true
})
