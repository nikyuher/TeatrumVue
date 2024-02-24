<script setup lang="ts">

import ListaGenero from '@/components/ListaGenero.vue'

const listaGeneros = ['comedia', 'terror', 'drama', 'musical', 'tragedia']
const obtenerGenero = (contexto: string): string => {

    switch (contexto) {
        case 'comedia':
            return 'Comedia';
        case 'terror':
            return 'Terror';
        case 'drama':
            return 'Drama';
        case 'musical':
            return 'Musical';
        case 'tragedia':
            return 'Tragedia';
        default:
            return '';
    }

}
</script>

<template>
    <main>
        <article>
            <div class="letraTextoGeneral">
                <section>
                    <div class="contenedorTituloGeneros">
                        <div class="tituloGeneros">
                            <h1>Catalogo</h1>
                        </div>
                        <div class="imagenGeneros">
                            <img src="@/assets/imagenes/obras/banner-generos-teatro.jpg" alt="">
                        </div>
                    </div>
                </section>
                <section v-for="contexto in listaGeneros" :key="contexto">
                    <div>
                        <div >
                            <router-link :to="{ name: 'genero', params: { genero: obtenerGenero(contexto) } }">
                                <h2>{{ obtenerGenero(contexto) }}</h2>
                            </router-link>
                        </div>
                        <ListaGenero :genero="obtenerGenero(contexto)"></ListaGenero>
                    </div>
                </section>
            </div>
        </article>
    </main>
</template>

<style scoped>
main {
    background-color: rgb(55, 55, 117);
    color: white;
}

/*Contenedor Titulo e Imagen Generos*/
.contenedorTituloGeneros {
    display: grid;
    margin-bottom: 100px;
}

.tituloGeneros h1 {
    width: 100%;
    color: rgb(255, 60, 60);
}

.imagenGeneros {
    display: flex;
    justify-content: center;
}

.imagenGeneros img {
    height: 500px;
}
</style>
