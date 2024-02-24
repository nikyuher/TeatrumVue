<script setup lang="ts">

import ObraId from '@/components/ObraEspecificaId.vue'
import Ticket from '@/components/TicketReserva.vue'

import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const idObra = ref<number>(0);
idObra.value = Array.isArray(route.params.idObra) ? parseInt(route.params.idObra[0]) : parseInt(route.params.idObra);

const tituloRecibido = ref<string>("");
const precioRecibido = ref<number>(0); 

const handleObraCargada = (data: { titulo: string; precio: number }) => {
    console.log('Evento obraCargada recibido con los siguientes datos:', data);
    tituloRecibido.value = data.titulo;
    precioRecibido.value = data.precio;
};
</script>

<template>
    <div>
        <div class="contenedorComprar">
            <div class="descriPopular ">
                <div class="contImagenObraPopular">
                    <img src="@/assets/imagenes/obras/dracula.jpg" alt="ObraPopular">
                </div>
                <div class="descripcionCompra">
                    <ObraId :id-obra="idObra" @obraCargada="handleObraCargada"></ObraId>
                </div>
            </div>
            <div class="formComprar">
                <Ticket :titulo="tituloRecibido" :precio="precioRecibido"></Ticket>
            </div>
        </div>
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
</style>