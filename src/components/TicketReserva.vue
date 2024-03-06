<script setup lang="ts">

import { useInfoButaca } from '@/store/infoButaca';
import { usarInfoUsuario } from '@/store/userInfo';
import { useObraInfo } from '@/store/obraInfo';
import { computed } from 'vue';


const props = defineProps<{
    idObra?: number;
}>();
const idObraReal = props.idObra;

const Usuario = usarInfoUsuario();
const userInfo = computed(() => Usuario.userInfo);

const Obra = useObraInfo();
const obraInfo = computed(() => Obra.infoObra);

const Butaca = useInfoButaca();
const butacaInfo = computed(() => Butaca.butacas);

const idUsuario = Usuario.userInfo?.usuarioId

const handleCompra = async () => {

    try {

        if (Usuario.userInfo?.usuarioId == null) {
            return alert('Tienes que Iniciar Sesion para Comprar.');
        }

        const Reserva = {
            usuarioId: idUsuario,
            obraId: idObraReal
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


        const ocuparAsiento = {
            asientoId: Butaca.butacas?.asientoId,
            obraId: idObraReal
        };

        const ocuparAsientoResponse = await fetch(`http://localhost:8001/Asiento/ocupados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ocuparAsiento)
        });

        if (!ocuparAsientoResponse.ok) {
            throw new Error('Fallo al actualizar el estado del asiento.');
        } else {
            Butaca.setButacas(null);
            alert('Compra Realizada');
        }

        window.location.reload();
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
                <label>Obra de Teatro </label>
                <v-text-field type="text" id="inputNombreObra" :value="obraInfo?.titulo"></v-text-field>
                <label>Sitio de Asiento:</label>
                <v-text-field type="text" id="inputSitioAsiento" required :value="butacaInfo?.nombreAsiento"></v-text-field>
                <label>Precio:$</label>
                <v-text-field type="number" id="inputPrecio" :value="obraInfo?.precio"></v-text-field>
            </div>
            <v-btn type="submit">
                Comprar
            </v-btn>
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
