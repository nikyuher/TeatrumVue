<script setup lang="ts">
import { ref, onMounted } from 'vue'
import urlStore from '@/store/urlApi';
import { usarInfoUsuario } from '@/store/userInfo';

const Usuario = usarInfoUsuario();
const idUsuario = Usuario.userInfo?.usuarioId
const baseUrl: string = urlStore.baseUrl;

const Reservas = ref<any[]>([]);
onMounted(async () => {

    try {
        const response = await fetch(`${baseUrl}/Reserva/usuario/${idUsuario}`);

        if (!response.ok) {
            throw new Error("No se pudo obtener data");
        }

        const listReservas = await response.json();

        Reservas.value = listReservas;

    } catch (error) {
        console.log(error)
    }
});
</script>

<template>
    <div v-for="reserva in Reservas" :key="reserva.reservaId">
        <p>{{ reserva.obra.título }} {{ reserva.obra.genero }} {{ reserva.obra.fechaHora }}  ${{ reserva.obra.precioEntrada }} {{ reserva.asiento.nombreAsiento }}</p>
    </div>
</template>

<style scoped></style>