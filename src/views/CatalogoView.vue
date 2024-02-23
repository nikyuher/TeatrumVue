<script setup lang="ts">
import TargetaGenero from '@/components/TargetaGenero.vue'

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
                <section v-for="contexto in ['comedia', 'terror', 'drama', 'musical', 'tragedia']" :key="contexto">
                    <div :class="contexto">
                        <router-link to="/genero">
                            <h2>{{ obtenerGenero(contexto) }}</h2>
                        </router-link>
                        <TargetaGenero :genero="obtenerGenero(contexto)"></TargetaGenero>

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
