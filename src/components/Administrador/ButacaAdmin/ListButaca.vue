<script setup lang="ts">
import { ref, onMounted } from 'vue'
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

interface Asiento {
    asientoId: number;
    nombreAsiento: string;
    estado: boolean;
}

const butacas = ref<Asiento[]>([]);
const responseMessage = ref('');
const estadoSeleccionado = ref<boolean | null>(false);

onMounted(async () => {
    await fetchButacas();
});

const fetchButacas = async () => {
    try {
        if (estadoSeleccionado.value === null) {
            responseMessage.value = 'Por favor, seleccione un estado.';
            return;
        }
        
        const response = await fetch(`${baseUrl}/Asiento/estado/${estadoSeleccionado.value}`);
        
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
            <select id="estado" v-model="estadoSeleccionado" @change="handleEstadoChange" class="custom-select">
                <option :value="true">Ocupado</option>
                <option :value="false">Disponible</option>
            </select>
        </div>
        <div class="scroll-container">
            <ul class="lista-butacas">
                <li v-for="butaca in butacas" :key="butaca.asientoId" class="butaca-item">
                    <div class="butaca-info">
                        <p><strong>ID:</strong> {{ butaca.asientoId }}</p>
                        <p><strong>Nombre:</strong> {{ butaca.nombreAsiento }}</p>
                        <p><strong>Estado:</strong> {{ butaca.estado ? 'Ocupado' : 'Disponible' }}</p>
                    </div>
                </li>
            </ul>
        </div>
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
    margin: 0;
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

.scroll-container {
    overflow-y: auto;
    height: 500px;
}

.custom-select {
    width: 100%;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    appearance: none;
    outline: none;
    margin-bottom: 20px;
}

.custom-select:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>