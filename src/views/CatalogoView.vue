<script setup lang="ts">


import EjemploComponent from '@/components/EjemploComponent.vue'

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
                <section>
                    <EjemploComponent></EjemploComponent>
                    <div class="comedia" data-genero="comedia">
                        <router-link to="/genero" class="cargarContenido" data-genero="comedia">
                            <h2>Comedia</h2>
                        </router-link>
                        <div class="contenedorGeneros"></div>
                    </div>
                </section>
                <section>
                    <div class="terror" data-genero="terror">
                        <router-link to="/genero" class="cargarContenido" data-genero="terror">
                            <h2>Terror</h2>
                        </router-link>
                        <div class="contenedorGeneros"></div>
                    </div>
                </section>
                <section>
                    <div class="drama" data-genero="drama">
                        <router-link to="/genero" class="cargarContenido" data-genero="drama">
                            <h2>Drama</h2>
                        </router-link>
                        <div class="contenedorGeneros"></div>
                    </div>
                </section>
                <section>
                    <div class="musical" data-genero="musical">
                        <router-link to="/genero" class="cargarContenido" data-genero="musical">
                            <h2>Musical</h2>
                        </router-link>
                        <div class="contenedorGeneros"></div>
                    </div>
                </section>
                <section>
                    <div class="tragedia" data-genero="tragedia">
                        <router-link to="/genero" class="cargarContenido" data-genero="tragedia">
                            <h2>Tragedia</h2>
                        </router-link>
                        <div class="contenedorGeneros"></div>
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