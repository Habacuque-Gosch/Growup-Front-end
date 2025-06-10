<template>

    <div class="div-busca">
        
        <form class="form-de-busca" action="">

            <input class="input-busca" type="text" name="buscar" id="buscar" placeholder="Pesquisar" v-model="searchQuery" @input="emitSearch">

            <button class="btn-filtro" type="button" onclick="exibir_filtro()">
                <i class="bi bi-filter-right"></i>
            </button>
            <!-- <input class="input-busca" type="text" name="projects" id="projects" placeholder="Pesquisar" hx-get="" hx-trigger="keyup" hx-target="#projects-output">
            <div id="projects-output"></div> -->

        </form>

        <div id="filtro_id_mobile" class="div-filtro-mobile">

            <form class="form-fitro-estabelecimento" action="">

                <input class="input-busca-filtro" type="text" name="buscar" id="buscar" placeholder="Pesquisar">

                <div class="distancia-e-filtro-mobile">

                    <p>Preço <b class="destaque-distancia-filtro-mobile">R$<output id="value-preco-filtro"></output></b></p>
                    <input type="range"  min="1" max="2000" value="50" id="value-preco-filtro-mobile">

                </div>

                <div class="div-btns-filtro-mobile">

                    <button class="btns-filtro-mobile">Aplicar filtros</button>
                    <button type="button" onclick="fechar_filtro()" class="btns-filtro-mobile" style="background-color: #fff; color: var(--primaria);">Fechar</button>

                </div>

            </form>

        </div>

        <div class="caixa-tags">

            <div class="tag">
                <a href="">TI</a>
            </div>

            <div class="tag">
                <a href="">Programação</a>
            </div>

            <div class="tag">
                <a href="">Engenharia</a>
            </div>

            <div class="tag">
                <a href="">Manufatura</a>
            </div>

            <div class="tag">
                <a href="">Design</a>
            </div>

            <div class="tag">
                <a href="">Marketing</a>
            </div>

            <div class="tag">
                <a href="">Suporte</a>
            </div>

            <div class="tag">
                <a href="">Jurídico</a>
            </div>
            
            <div class="tag">
                <a href="">Finanças</a>
            </div>

        </div>

        <div class="filter-desk">

            <select v-model="selectedCategory" @change="emitSearch">
                <option value="">Todas as categorias</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>

            <article class="filter-cat-desk">

                <h2>Categorias</h2>

                <select class="select-filter" name="category">
                    <option value="">-- Selecione uma categoria --</option>
                    <option value="TI E PROGRAMACAO">TI e Programação</option>
                </select>

            </article>

            <hr>

            <article class="filter-cat-desk">

                <h2>Nível</h2>

                <select class="select-filter" name="level">
                    <option value="">-- Selecione um nível --</option>
                    <option value="INICIANTE">Iniciante</option>
                    <option value="INTERMEDIÁRIO">Intermediário</option>
                    <option value="AVANÇADO">Avançado</option>
                </select>
                
            </article>
                
        </div>

    </div> 

</template>

<script setup>

    import { ref, onMounted } from 'vue'
    import { baseAPI } from '@/api/axios_api'

    const emit = defineEmits(['search-updated'])

    const searchQuery = ref('')
    const selectedCategory = ref('')
    const categories = ref([])

    const emitSearch = () => {
        emit('search-updated', {
            search: searchQuery.value,
            category: selectedCategory.value
        })
    }

    onMounted(() => {
        baseAPI.get('/courses/categories/')
            .then(res => {
                categories.value = res.data
            })
            .catch(err => {
                console.log('Erro ao carregar categorias:', err)
            })
    })
</script>