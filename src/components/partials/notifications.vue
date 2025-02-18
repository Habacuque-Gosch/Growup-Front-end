<template>

    <p v-if="messagesApp != ''" class="alert alert-info" role="alert">{{ messagesApp[0] }}</p>

</template>


<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup(){
        const store = useStore()
        var messagesApp = computed(()=> store.state.messagesApp)
        // errorMessages = 'erro'
        return {messagesApp}
    }
}
</script>