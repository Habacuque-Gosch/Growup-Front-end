import { createStore } from 'vuex';
import usuario from './usuario'


const store = createStore({
    modules: {
        usuario
    }
})

export default store