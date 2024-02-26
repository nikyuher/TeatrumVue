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

        // Crear el payload con la URL de la imagen
        const payload = {
            titulo: obra.value.título,
            precio: obra.value.precioEntrada,
            // Convertir los bytes de la imagen en URL utilizando la función getImagenUrl
            imagen: getImagenUrl(obra.value.imagen)
        };

        emits('obraCargada', payload);

    } catch (error) {
        console.error('Error al obtener la obra:', error);
    }
});

// Función para convertir los bytes de la imagen en una URL
const getImagenUrl = (imagenBytes: string) => {
    const base64ToBlob = (base64: string) => {
        const binaryString = window.atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Blob([bytes], { type: 'image/png' });
    };

    const blob = base64ToBlob(imagenBytes);
    return URL.createObjectURL(blob);
};
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

