<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useObraInfo } from '@/store/obraInfo';

const busquedaInput = ref('');
const resultadosBusqueda = ref<any[]>([]);
const dropdown = ref<HTMLElement | null>(null);
const store = useObraInfo();

const search = async () => {
    try {
        await store.searchObra(busquedaInput.value)

        resultadosBusqueda.value = store.resultadosBusqueda;
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
            store.resultadosBusqueda = []
        }
    }
});

onMounted(() => {
    document.addEventListener('click', manejarHacerclicFuera);
});

const manejarHacerclicFuera = (event: MouseEvent) => {
    if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
        resultadosBusqueda.value = [];
        store.resultadosBusqueda = []
        busquedaInput.value = '';
    }
}

const ocultarDesplegable = () => {
    busquedaInput.value = '';
    resultadosBusqueda.value = [];
    store.resultadosBusqueda = [];
    setTimeout(() => {
        window.location.reload();
    }, 200);

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
