<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps<{
    idObra: number;
}>();

const emits = defineEmits(['obraCargada']);

const obra = ref<any>(null);
const idObra = props.idObra;

onMounted(async () => {
    try {
        const response = await fetch(`http://localhost:8001/Obra/${idObra}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener la data');
        }

        const data = await response.json();
        obra.value = data;

        const payload = {
            titulo: obra.value.título, 
            precio: obra.value.precioEntrada 
        };
        emits('obraCargada', payload);

        console.log('Datos enviados:', payload); 

    } catch (error) {
        console.error('Error al obtener la obra:', error);
    }
});

</script>

<template>
    <div v-if="obra">
        <h1>{{ obra.título }}</h1>
        <p>{{ obra.descripción }}</p>
    </div>
    <div v-else>
        <p>No se encontró ninguna obra para mostrar.</p>
    </div>
</template>

<style scoped></style>


<style scoped></style>


<style scoped></style>

