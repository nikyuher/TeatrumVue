<script setup lang="ts">

</script>

<template>
    <main>
        <div class="letraTextoGeneral">
            <section>
                <div class="contTituloGeneroSelec">
                    <div class="tituloGeneroSelec">
                        <h1>Comedia</h1>
                    </div>
                    <div class="imgGeneroSelec">
                        <img src="@/assets/imagenes/obras/banner-generos-teatro.jpg" alt="">
                    </div>
                </div>
            </section>
            <section>
                <div class="contenedorObras">
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