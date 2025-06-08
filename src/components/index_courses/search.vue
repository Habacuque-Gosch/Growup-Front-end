<template>

    <div class="div-busca">
        
        <form class="form-de-busca" action="">

            <input class="input-busca" type="text" name="buscar" id="buscar" placeholder="Pesquisar">

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

            <form action="" method="get" class="form-filter-jobs">


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
                
                <button class="base-btn-forms">Filtrar</button>

            </form>

        </div>

    </div> 

</template>

<script>

    // function exibir_filtro() {

    //     var id_filtro = document.getElementById("filtro_id_mobile")

    //     id_filtro.style.display = "flex"

    // }

    // function fechar_filtro() {

    // var id_filtro = document.getElementById("filtro_id_mobile")

    // id_filtro.style.display = "none"

    // }

    // // const value_distancia = document.querySelector("#value-distancia-filtro");
    // // const input_distancia = document.querySelector("#value-distancia-filtro-mobile");
    // const value_preco = document.querySelector("#value-preco-filtro");
    // const input_preco = document.querySelector("#value-preco-filtro-mobile");

    // // value_distancia.textContent = input_distancia.value;
    // // input_distancia.addEventListener("input", (event) => {
    // // value_distancia.textContent = event.target.value;
    // // });

    // value_preco.textContent = input_preco.value;
    // input_preco.addEventListener("input", (event) => {
    // value_preco.textContent = event.target.value;
    // });

</script>