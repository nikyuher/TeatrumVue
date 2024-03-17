<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import urlStore from '@/store/urlApi';

interface Obra {
    obraId: number;
    imagen: string;
    título: string;
    descripcion: string;
    fechaHora: string;
    precioEntrada: number;
}

const baseUrl: string = urlStore.baseUrl;
const busquedaInput = ref('');
const resultadosBusqueda = ref<Obra[]>([]);
const dropdown = ref<HTMLElement | null>(null);

const search = async () => {
    try {
        const response = await fetch(`${baseUrl}/Obra/search?titulo=${busquedaInput.value}`);
        if (!response.ok) {
            throw new Error('Fallo al obtener los datos.');
        }
        const data = await response.json();
        resultadosBusqueda.value = data;
    } catch (error) {
        console.log(error);
    }
}

const busqueda = computed({
    get: () => busquedaInput.value,
    set: (value) => { 
        busquedaInput.value = value; 
        if (!value) {
            resultadosBusqueda.value = []; 
        }
    }
});

onMounted(() => {
    document.addEventListener('click', manejarHacerclicFuera);
});

const manejarHacerclicFuera = (event: MouseEvent) => {
    if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
        resultadosBusqueda.value = [];
        busquedaInput.value = ''; 
    }
}

const ocultarDesplegable = () => {
    busquedaInput.value = ''; 
    resultadosBusqueda.value = [];
}

</script>

<template>
    <input type="search" @input="search" v-model="busqueda" class="bg-white" placeholder="Buscar Obra">
    <div ref="dropdown" class="desplegable" v-if="resultadosBusqueda.length > 0"
        style="max-height: 400px; overflow-y: auto;">
        <v-card v-for="obra in resultadosBusqueda" :key="obra.obraId">
            <router-link :to="{ name: 'comprar', params: { idObra: obra.obraId } }" @click="ocultarDesplegable">
                <v-img :src="`data:image/jpeg;base64,${obra.imagen}`" width="50"></v-img>
                <p>{{ obra.título }}</p>
            </router-link>
        </v-card>
    </div>
</template>

<style scoped>
.desplegable {
    max-height: 300px;
    overflow-y: auto;
    position: absolute;
    z-index: 999;
    background-color: white;
    border: 1px solid gray;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: calc(100% - 20px);
}
</style>
