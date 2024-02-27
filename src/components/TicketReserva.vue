<script setup lang="ts">

import { useInfoButaca } from '@/store/infoButaca';
import { usarInfoUsuario } from '@/store/userInfo';
import { useObraInfo } from '@/store/obraInfo';
import { ref,computed } from 'vue';


const Usuario = usarInfoUsuario();
const userInfo = computed(() => Usuario.userInfo);

const Obra = useObraInfo();
const obraInfo = computed(() => Obra.infoObra);

const Butaca = useInfoButaca();
const butacaInfo = computed(() => Butaca.butacas);

const handleCompra = () => {
    console.log('Compra realizada');
};

</script>

<template>
    <h2>Reserva Asiento</h2>
    <div class="contenidoForm">
        <form @submit.prevent="handleCompra">
            <div class="datosForm">
                <label>Obra de Teatro Id: {{ obraInfo?.idObra }}</label>
                <p>id Usuario: {{ userInfo?.usuarioId }}</p>
                <input type="text" id="inputNombreObra" :value="obraInfo?.titulo">
                <label>Sitio de Asiento: ID {{ butacaInfo?.asientoId }}</label>
                <input type="text" id="inputSitioAsiento" required :value="butacaInfo?.nombreAsiento">
                <label>Precio:$</label>
                <input type="number" id="inputPrecio" :value="obraInfo?.precio">
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
