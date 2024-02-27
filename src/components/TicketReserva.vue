<script setup lang="ts">

import { useInfoButaca } from '@/store/infoButaca';
import { usarInfoUsuario } from '@/store/userInfo';
import { useObraInfo } from '@/store/obraInfo';
import { ref, computed } from 'vue';


const Usuario = usarInfoUsuario();
const userInfo = computed(() => Usuario.userInfo);

const Obra = useObraInfo();
const obraInfo = computed(() => Obra.infoObra);

const Butaca = useInfoButaca();
const butacaInfo = computed(() => Butaca.butacas);

const idUsuario = Usuario.userInfo?.usuarioId
const idObra = obraInfo.value?.idObra;

const handleCompra = async () => {

    try {

        if (Usuario.userInfo?.usuarioId == null) {
            return alert('Tienes que Iniciar Sesion para Comprar.');
        }

        const Reserva = {
            usuarioId: idUsuario,
            obraId: idObra,
            asientoId: butacaInfo.value?.asientoId
        };


        const response = await fetch(`http://localhost:8001/Reserva/${idUsuario}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Reserva)
        });

        if (!response.ok) {
            throw new Error('Fallo al Hacer la reserva');
        }


        const putAsiento = {
            asientoId: butacaInfo.value?.asientoId,
            estado: true
        };

        // Realizar la solicitud PUT para actualizar el estado del asiento a true
        const actualizarAsientoResponse = await fetch(`http://localhost:8001/Asiento/${butacaInfo.value?.asientoId}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putAsiento)
        });

        if (!actualizarAsientoResponse.ok) {
            throw new Error('Fallo al actualizar el estado del asiento.');
        } else {
            alert('Compra Realizada');
        }

    } catch (error) {
        console.log(error)
    }

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

.datosForm {
    pointer-events: none;
}
</style>
