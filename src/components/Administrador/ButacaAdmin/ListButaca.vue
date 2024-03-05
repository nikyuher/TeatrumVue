<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Asiento {
    asientoId: number;
    nombreAsiento: string;
    estado: boolean;
}

const butacas = ref<Asiento[]>([]);
const responseMessage = ref('');
const estadoSeleccionado = ref<boolean | null>(null);

onMounted(async () => {
    await fetchButacas();
});

const fetchButacas = async () => {
    try {
        if (estadoSeleccionado.value === null) {
            responseMessage.value = 'Por favor, seleccione un estado.';
            return;
        }

        const response = await fetch(`http://localhost:8001/Asiento/estado/${estadoSeleccionado.value}`);

        if (!response.ok) {
            throw new Error('Fallo al obtener la lista de butacas.');
        }

        const data = await response.json();
        butacas.value = data;

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error al obtener la lista de butacas.';
    }
};

const handleEstadoChange = () => {
    fetchButacas();
};

</script>

<template>
    <div class="contenedor">
        <h2>Lista de Butacas</h2>
        <div>
            <label for="estado">Filtrar por estado:</label>
            <select id="estado" v-model="estadoSeleccionado" @change="handleEstadoChange">
                <option value="" disabled selected>Seleccione un estado</option>
                <option :value="true">Ocupado</option>
                <option :value="false">Disponible</option>
            </select>
        </div>
        <ul class="lista-butacas">
            <li v-for="butaca in butacas" :key="butaca.asientoId" class="butaca-item">
                <div class="butaca-info">
                    <p><strong>ID:</strong> {{ butaca.asientoId }}</p>
                    <p><strong>Nombre:</strong> {{ butaca.nombreAsiento }}</p>
                    <p><strong>Estado:</strong> {{ butaca.estado ? 'Ocupado' : 'Disponible' }}</p>
                </div>
            </li>
        </ul>
        <p class="response">{{ responseMessage }}</p>
    </div>
</template>

<style scoped>
.contenedor {
    width: 80%;
    margin: 0 auto;
}

.lista-butacas {
    list-style-type: none;
    padding: 0;
}

.butaca-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.butaca-info {
    font-size: 16px;
}

.response {
    margin-top: 10px;
    color: red;
}
</style>
