<script setup lang="ts">
import { ref, onMounted } from 'vue'
import urlStore from '@/store/urlApi';
import { usarInfoUsuario } from '@/store/userInfo';
import DeleteReserva from '@/components/ReservaDelete.vue';

const Usuario = usarInfoUsuario();
const idUsuario = Usuario.userInfo?.usuarioId
const baseUrl: string = urlStore.baseUrl;
const tableKey = ref(0);

interface Reserva {
    reservaId: number;
    obra: {
        título: string;
        genero: string;
        fechaHora: string;
        precioEntrada: number;
        imagen: string;
    };
    asiento: {
        asientoId: number;
        nombreAsiento: string;
    };
}
const Reservas = ref<Reserva[]>([]);
const headers = [
    { title: 'Imagen', value: 'obra.imagen' },
    { title: 'Título', value: 'obra.título' },
    { title: 'Género', value: 'obra.genero' },
    { title: 'Fecha y Hora', value: 'obra.fechaHora' },
    { title: 'Asiento', value: 'asiento.nombreAsiento' },
    { title: 'Precio', value: 'obra.precioEntrada' },
];
const fetchReservas = async () => {

    try {
        const response = await fetch(`${baseUrl}/Reserva/usuario?id=${idUsuario}`);

        if (!response.ok) {
            throw new Error("No se pudo obtener data");
        }

        const listReservas = await response.json();

        Reservas.value = listReservas;

    } catch (error) {
        console.log(error)
    }
};
const ImagenUrl = (base64Image: string): string => {
    return `data:image/jpeg;base64,${base64Image}`;
};
const formatearFechaHora = (fechaHora: string): string => {
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

const reloadReservas = (confirmacion: boolean) => {
    if (confirmacion) {
        tableKey.value += 1;
        fetchReservas();
    }
};

onMounted(fetchReservas);

const obtenerConfirmacion = (confirmacion: boolean) => {
    reloadReservas(confirmacion);
};

</script>

<template>
    <h2>Listado de Reservas</h2>
    <v-data-table :key="tableKey" :headers="headers" :items="Reservas" item-key="reservaId">
        <template v-slot:item="{ item }">
            <tr>
                <td><img :src="ImagenUrl(item.obra.imagen)" alt="Imagen de la obra" height="50"></td>
                <td>{{ item.obra.título }}</td>
                <td>{{ item.obra.genero }}</td>
                <td>{{ formatearFechaHora(item.obra.fechaHora) }}</td>
                <td>{{ item.asiento.nombreAsiento }}</td>
                <td>${{ item.obra.precioEntrada }}</td>
                <DeleteReserva :id-reserva="item.reservaId" @confirmacion="obtenerConfirmacion"></DeleteReserva>
            </tr>
        </template>
    </v-data-table>
</template>

<style scoped>

@media screen and (max-width: 875px) {
    .v-data-table {
        width: 820px;
    }
}

@media screen and (max-width: 768px) {
    .v-data-table {
        width: 750px;
    }
}

@media screen and (max-width: 540px) {
    .v-data-table {
        width: 520px;
    }
}

@media screen and (max-width: 430px) {
    .v-data-table {
        width: 412px;
    }
}

@media screen and (max-width: 390px) {
    .v-data-table {
        width: 390px;
    }
}
</style>