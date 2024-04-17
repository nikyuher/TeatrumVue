<script setup lang="ts">

import { useInfoAsientos } from '@/store/listaButacas';
import { usarInfoUsuario } from '@/store/userInfo';
import { useObraInfo } from '@/store/obraInfo';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useReserva } from '@/store/reserva';

const router = useRouter();
const storeReserva = useReserva();

const props = defineProps<{
    idObra: number;
}>();

const idObraReal = props.idObra;

const Usuario = usarInfoUsuario();

const Obra = useObraInfo();
const obraInfo = computed(() => Obra.infoObra);

const Asientos = useInfoAsientos();

const idUsuario = Usuario.userInfo?.usuarioId

const nombreAsientos = computed(() => Asientos.butacasSeleccionadas.map(butaca => butaca.nombreAsiento).join(', '));

const total = computed(() => {
    if (!obraInfo.value) return 0;
    return obraInfo.value.precio * Asientos.butacasSeleccionadas.length;
})

const eventoCompra = async () => {
    try {

        if (Usuario.userInfo?.usuarioId === null || Usuario.userInfo?.usuarioId === undefined) {
            throw new Error('Tienes que Iniciar Sesion para Comprar.');
        }

        const Reservas = Asientos.butacasSeleccionadas.map(butaca => ({
            usuarioId: idUsuario,
            obraId: idObraReal,
            asientoId: butaca.asientoId
        }));

        await storeReserva.crearReserva(Reservas)

        const ocuparAsiento = Asientos.butacasSeleccionadas.map(butaca => ({
            obraId: idObraReal,
            asientoId: butaca.asientoId
        }));

        await Asientos.crearButacaOcupada(ocuparAsiento)

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
        Asientos.butacasSeleccionadas = [];
        setTimeout(() => {
            router.push('/catalogo');
        }, 1000);



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
            <v-text-field type="text" id="inputNombreObra" :value="obraInfo?.título"></v-text-field>
            <label>Sitio de Asiento:</label>
            <v-text-field type="text" id="inputSitioAsiento" :value="nombreAsientos" readonly></v-text-field>
            <label>Dìa y hora</label>
            <v-text-field type="number">{{ formatearFechaHora(Obra.infoObra?.fechaHora) }}</v-text-field>
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
                <v-card class="ajustar" v-if="idUsuario === null || idUsuario === undefined">
                    <v-icon color="red" size="100">
                        mdi-close-circle
                    </v-icon>
                    <v-card-text>
                        <h1>Tienes que Iniciar Sesión</h1>
                    </v-card-text>
                    <v-btn class="botonSesion">
                        <router-link to="/login" class="text-color">Iniciar Sesion</router-link>
                    </v-btn>
                </v-card>
                <v-card class="ajustar" v-else>
                    <v-icon color="green" size="100">
                        mdi-check-circle
                    </v-icon>
                    <v-card-text>
                        <h1>Comprado Exitosamente</h1>
                    </v-card-text>
                </v-card>
            </template>
        </v-dialog>
    </form>
</template>

<style scoped>
.text-color {
    color: rgb(255, 255, 255);
    text-decoration: none;
}

.botonSesion {
    font-family: 'Radio Canada', sans-serif;
    background-color: rgb(55, 80, 165);
}


.botonSesion:hover {
    background-color: rgb(29, 44, 92);
}

.ajustar {
    text-align: center;
    align-items: center;
}

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
