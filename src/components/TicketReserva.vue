<script setup lang="ts">

import { usarInfoUsuario } from '@/store/userInfo';
import { ref,computed } from 'vue';


const props = defineProps<{
    titulo: string;
    precio: number;
    butaca: string;
}>();

const store = usarInfoUsuario();
const userInfo = computed(() => store.userInfo);

const handleCompra = () => {
    console.log('Compra realizada');
};

</script>

<template>
    <h2>Reserva Asiento</h2>
    <div class="contenidoForm">
        <form @submit.prevent="handleCompra">
            <div class="datosForm">
                <label>Obra de Teatro</label>
                <p>id Usuario: {{ userInfo?.usuarioId }}</p>
                <input type="text" id="inputNombreObra" :value="titulo">
                <label>Sitio de Asiento</label>
                <input type="text" id="inputSitioAsiento" required :value="butaca">
                <label>Precio:$</label>
                <input type="number" id="inputPrecio" :value="precio">
            </div>
            <input id="comprar" type="submit" value="Comprar">
        </form>
    </div>
</template>

<style scoped>
.contenidoForm {
    text-align: left;
    width: 200px;
    margin: auto;
}

.contenidoForm #comprar {
    margin-top: 20px;
}
.datosForm{
    pointer-events: none;
}
</style>
