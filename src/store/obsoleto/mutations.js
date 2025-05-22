export default {
    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },
    removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
    }
}