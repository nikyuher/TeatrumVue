<script setup lang="ts">

import butacas from '@/components/ListaButacas.vue'
import ObraId from '@/components/ObraEspecificaId.vue'
import Ticket from '@/components/TicketReserva.vue'

import { computed, ref } from 'vue'
import { useObraInfo } from '@/store/obraInfo';
import { useRoute } from 'vue-router';

const store = useObraInfo();
const obraInfo = computed(() => store.infoObra);

const route = useRoute();
const idObra = ref<number>(0);
idObra.value = Array.isArray(route.params.idObra) ? parseInt(route.params.idObra[0]) : parseInt(route.params.idObra);


</script>

<template>
    <div>
        <div class="contenedorComprar">
            <div class="descriPopular ">
                <div class="contImagenObraPopular">
                    <img :src="obraInfo?.imagen" alt="Imagen de la obra">
                </div>
                <div class="descripcionCompra">
                    <ObraId :id-obra="idObra"></ObraId>
                </div>
            </div>
            <div class="formComprar">
                <Ticket :id-obra="idObra"></Ticket>
            </div>
        </div>
    </div>
    <div class="contenedorBloques">
        <butacas :id-obra="idObra"></butacas>
    </div>
</template>

<style scoped>
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

/*Bloue de seleccion de asientos*/
.contenedorBloques {
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    margin: auto;
    padding-bottom: 100px;
}
</style>