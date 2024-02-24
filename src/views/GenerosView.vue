<script setup lang="ts">

import ListaGenero from '@/components/ListaGenero.vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Obtener la referencia a la ruta actual
const route = useRoute();

// Inicializar genero como una referencia de tipo string
const genero = ref<string>('');

// Asignar el valor de la ruta a genero
genero.value = Array.isArray(route.params.genero) ? route.params.genero[0] : route.params.genero;

</script>

<template>
    <main>
        <div class="letraTextoGeneral">
            <section>
                <div class="contTituloGeneroSelec">
                    <div class="tituloGeneroSelec">
                        <h1>{{ $route.params.genero }}</h1>
                    </div>
                    <div class="imgGeneroSelec">
                        <img src="@/assets/imagenes/obras/banner-generos-teatro.jpg" alt="">
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <ListaGenero :genero="genero"></ListaGenero>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: rgb(55, 55, 117);
    color: white;
}

/*Contenedor de Titulo e Imagen */
.contTituloGeneroSelec {
    display: grid;
}

.tituloGeneroSelec h1 {
    width: 100%;
    color: rgb(255, 60, 60);
}

.imgGeneroSelec {
    display: flex;
    justify-content: center;
}

.imgGeneroSelec img {
    width: 90%;
    height: 400px;
}
</style>