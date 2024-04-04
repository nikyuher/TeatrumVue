<script setup lang="ts">

import { computed, ref } from 'vue'
import { useObraInfo } from '@/store/obraInfo';
import { useRoute } from 'vue-router';

import butacas from '@/components/ListaButacas.vue'
import ObraId from '@/components/ObraEspecificaId.vue'
import Ticket from '@/components/TicketReserva.vue'


const store = useObraInfo();
const obraInfo = computed(() => store.infoObra);

const route = useRoute();
const idObra = ref<number>(0);
idObra.value = Array.isArray(route.params.idObra) ? parseInt(route.params.idObra[0]) : parseInt(route.params.idObra);

const items = ['Información de la Obra', 'Escoger Butacas', 'Comprar Tickets'];
const items2 = ['Información', 'Butacas', 'Comprar'];
const step = ref<number>(1);

</script>

<template>
    <div class="vistaWindows">
        <v-stepper v-model="step" :items="items" show-actions>
            <template v-slot:item>
                <div class="contenedorComprar">
                    <div class="contImagenObraPopular">
                        <img :src="obraInfo?.imagen" alt="Imagen de la obra">
                    </div>
                    <div class="descripcionCompra">
                        <ObraId :id-obra="idObra"></ObraId>
                    </div>
                </div>
            </template>

            <template v-slot:item.2>
                <div class="contenedorBloques">
                    <butacas :id-obra="idObra"></butacas>
                </div>
            </template>

            <template v-slot:item.3>
                <div class="formComprar">
                    <Ticket :id-obra="idObra"></Ticket>
                </div>
            </template>
        </v-stepper>
    </div>
    <div class="vistaMobil">
        <v-stepper v-model="step" :items="items2" show-actions>
            <template v-slot:item>
                <div class="contenedorComprar2">
                    <h1>Informacion Obra</h1>
                    <v-carousel hide-delimiters>
                        <div class="cosa2">
                            <v-carousel-item>
                                <div class="contImagenObraPopular">
                                    <img :src="obraInfo?.imagen" alt="Imagen de la obra">
                                </div>
                            </v-carousel-item>
                            <v-carousel-item>
                                <div class="descripcionCompra2">
                                    <ObraId :id-obra="idObra"></ObraId>
                                </div>
                            </v-carousel-item>
                        </div>
                    </v-carousel>
                </div>
            </template>

            <template v-slot:item.2>
                <div class="contenedorBloques">
                    <butacas :id-obra="idObra"></butacas>
                </div>
            </template>

            <template v-slot:item.3>
                <div class="formComprar">
                    <Ticket :id-obra="idObra"></Ticket>
                </div>
            </template>
        </v-stepper>
    </div>
</template>

<style scoped>
/*Contenedor*/
.contenedorComprar {
    display: flex;
    height: 500px;
    margin-bottom: 30px;
}

.contenedorComprar2 {
    height: 550px;
    margin-bottom: 30px;
}

.vistaMobil {
    display: none;
}

/*Informacion de la Obra */

.contImagenObraPopular img {
    width: 266px;
}

.contImagenObraPopular {
    margin: auto;
}

.descripcionCompra {
    width: 30%;
    margin: auto;
    text-align: justify;
}

.descripcionCompra2 {
    width: 60%;
    margin-top: 40px;
    text-align: justify;
    margin: auto;
}

/*Formulario de comprar*/
.formComprar {
    width: 300px;
    height: 560px;
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
    margin: auto;
}

.cosa2 {
    margin: auto;
    align-items: center;
    text-align: center
}

@media screen and (max-width: 1060px) {
    .vistaWindows {
        display: none;
    }

    .vistaMobil {
        display: block;
    }
}

</style>