<script setup lang="ts">
import infoObra from '@/components/ReservarObra.vue'
import butacas from '@/components/ListaButacas.vue'

</script>

<template>
    <main>
        <article>
            <section>
                <infoObra></infoObra>
            </section>
            <section>
                <div class="contenedorBloques">
                    <butacas></butacas>
                </div>
            </section>
        </article>
    </main>
</template>


<style scoped>
main {
    background-color: rgb(55, 55, 117);
    color: white;
}

/*Contenedor*/
.contenedorComprar {
    display: flex;
    height: 500px;
    align-items: center;
    text-align: center;
    margin-bottom: 30px;
}

/*Informacion de la Obra */
.descriPopular {
    display: grid;
    text-align: justify;
    grid-template-columns: repeat(2, 100%);
    width: 450px;
    margin: auto;
}

.descriPopular p {
    font-size: 20px;
}

.contImagenObraPopular {
    margin: auto;
}

.contImagenObraPopular img {
    object-fit: cover;
    height: 400px;
}

/*Formulario de comprar*/
.formComprar {
    width: 300px;
    height: 350px;
    background-color: rgb(255, 255, 255);
    display: grid;
    flex-wrap: wrap;
    align-items: center;
    margin: auto;
    border-radius: 10px;
    color: black;
}

.contenidoForm {
    text-align: left;
    width: 200px;
    margin: auto;
}

.contenidoForm #comprar {
    margin-top: 20px;
}

/*Bloue de seleccion de asientos*/

.contenedorBloques {
    display: flex;
    width: 80%;
    height: 500px;
    justify-content: space-evenly;
    margin: auto;
    padding-bottom: 100px;
}
</style>