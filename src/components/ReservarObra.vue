<script setup lang="ts">

import butacas from '@/components/ListaButacas.vue'
import ObraId from '@/components/ObraEspecificaId.vue'
import Ticket from '@/components/TicketReserva.vue'

import { computed, ref, onMounted } from 'vue'
import { useObraInfo } from '@/store/obraInfo';
import { useRoute } from 'vue-router';

const store = useObraInfo();
const obraInfo = computed(() => store.infoObra);

const route = useRoute();
const idObra = ref<number>(0);
idObra.value = Array.isArray(route.params.idObra) ? parseInt(route.params.idObra[0]) : parseInt(route.params.idObra);

const cambiar = ref<boolean>();

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
});

const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 1060) {
        cambiar.value = false
    } else {
        cambiar.value = true
    }
};

</script>

<template>
    <div v-if="cambiar">
        <div class="contenedorComprar">
            <div class="contImagenObraPopular">
                <img :src="obraInfo?.imagen" alt="Imagen de la obra">
            </div>
            <div class="descripcionCompra">
                <ObraId :id-obra="idObra"></ObraId>
            </div>
            <div class="formComprar">
                <Ticket :id-obra="idObra"></Ticket>
            </div>
        </div>
        <div class="contenedorBloques">
            <butacas :id-obra="idObra"></butacas>
        </div>
    </div>
    <div v-else>
        <div class="cosa2">
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
                            <div class="descripcionCompra">
                                <ObraId :id-obra="idObra"></ObraId>
                            </div>
                        </v-carousel-item>
                    </div>
                </v-carousel>
            </div>
            <h1>Informacion Asientos</h1>
            <div class="contenedorBloques">
                <butacas :id-obra="idObra"></butacas>
            </div>
            <h1>Comprar</h1>
            <div class="formComprar">
                <Ticket :id-obra="idObra"></Ticket>
            </div>
        </div>
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

/*Informacion de la Obra */

.contImagenObraPopular img {
    width: 266px;
}

.contImagenObraPopular {
    margin: auto;
}

.descripcionCompra {
    margin-top: 40px;
}

/*Formulario de comprar*/
.formComprar {
    width: 300px;
    height: 460px;
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
</style>