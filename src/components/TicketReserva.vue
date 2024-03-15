<script setup lang="ts">

import { useInfoButaca } from '@/store/infoButaca';
import { useInfoAsientos } from '@/store/listaButacas';
import { usarInfoUsuario } from '@/store/userInfo';
import { useObraInfo } from '@/store/obraInfo';
import { computed } from 'vue';
import urlStore from '@/store/urlApi';
import { useRouter } from 'vue-router';
const router = useRouter();

const baseUrl: string = urlStore.baseUrl;

const props = defineProps<{
    idObra?: number;
}>();
const idObraReal = props.idObra;

const Usuario = usarInfoUsuario();

const Obra = useObraInfo();
const obraInfo = computed(() => Obra.infoObra);

const Butaca = useInfoButaca();
const Asientos = useInfoAsientos();

const idUsuario = Usuario.userInfo?.usuarioId

const nombreAsientos = computed(() => Butaca.butacasSeleccionadas.map(butaca => butaca.nombreAsiento).join(', '));

const total = computed(() => {
    if (!obraInfo.value) return 0;
    return obraInfo.value.precio * Butaca.butacasSeleccionadas.length;
})

const eventoCompra = async () => {
    try {

        if (Usuario.userInfo?.usuarioId == null) {
            return alert('Tienes que Iniciar Sesion para Comprar.');
        }

        const Reservas = Butaca.butacasSeleccionadas.map(butaca => ({
            usuarioId: idUsuario,
            obraId: idObraReal,
            asientoId: butaca.asientoId
        }));

        const response = await fetch(`${baseUrl}/Reserva/${idUsuario}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Reservas)
        });

        if (!response.ok) {
            throw new Error('Fallo al Hacer la reserva');
        }

        const ocuparAsiento = Butaca.butacasSeleccionadas.map(butaca => ({
            obraId: idObraReal,
            asientoId: butaca.asientoId
        }));


        const ocuparAsientoResponse = await fetch(`${baseUrl}/Asiento/ocupados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ocuparAsiento)
        });

        if (!ocuparAsientoResponse.ok) {
            throw new Error('Fallo al actualizar el estado del asiento.');
        } else {

            const nuevosAsientos = Asientos.asientos.map(asiento => {
                if (nombreAsientos.value.includes(asiento.nombreAsiento)) {
                    return {
                        ...asiento,
                        estado: true
                    };
                }
                return asiento;
            });

            Asientos.setAsientos(nuevosAsientos);
            Butaca.butacasSeleccionadas = [];
            setTimeout(() => {
                router.push('/catalogo');
            }, 2000);
        }


    } catch (error) {
        console.log(error)
    }

};

const formatearFechaHora = (fechaHora: string | undefined): string => {
    if (!fechaHora) return "";
    const date = new Date(fechaHora);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return date.toLocaleDateString('es-ES', options);
};

</script>

<template>
    <form @submit.prevent="eventoCompra">
        <div class="datosForm">
            <label>Obra de Teatro </label>
            <v-text-field type="text" id="inputNombreObra" :value="obraInfo?.titulo"></v-text-field>
            <label>Sitio de Asiento:</label>
            <v-text-field type="text" id="inputSitioAsiento" :value="nombreAsientos" readonly></v-text-field>
            <label>Dìa y hora</label>
            <v-text-field type="number">{{ formatearFechaHora( Obra.infoObra?.fechaHora ) }}</v-text-field>
            <label>Precio:</label>
            <v-text-field type="number" id="inputPrecio" :value="total">$</v-text-field>
        </div>
        <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn type="submit" v-bind="activatorProps" :disabled="nombreAsientos === ''"
                    :style="{ backgroundColor: nombreAsientos === '' ? 'red' : '', color: nombreAsientos === '' ? 'white' : '' }">
                    Comprar
                </v-btn>
            </template>
            <template v-slot:default>
                <v-card title="Comprado">
                    <v-card-text>
                        Comprado Exitosamente
                    </v-card-text>
                </v-card>
            </template>
        </v-dialog>
    </form>
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
