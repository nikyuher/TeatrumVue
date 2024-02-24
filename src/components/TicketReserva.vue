<script setup lang="ts">
import { defineProps} from 'vue';

const props = defineProps<{
    titulo: string;
    precio: number;
}>();

const handleCompra = () => {
    console.log('Compra realizada');
};
</script>

<template>
    <h2>Reserva Asiento</h2>
    <div class="contenidoForm">
        <form @submit.prevent="handleCompra">
            <label>Obra de Teatro</label>
            <input type="text" id="inputNombreObra" :value="titulo">
            <label>Sitio de Asiento</label>
            <input type="text" id="inputSitioAsiento" required>
            <label>Precio:$</label>
            <input type="number" id="inputPrecio" :value="precio">
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
</style>
