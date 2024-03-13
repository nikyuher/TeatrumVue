<script setup lang="ts">
import { useObraInfo } from '@/store/obraInfo';
import { ref, onMounted } from 'vue';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

const props = defineProps<{
    idObra?: number;
}>();

const obra = ref<any>(null);
const idObra = props.idObra;

const infoObraStore = useObraInfo();

onMounted(async () => {
    try {
        const response = await fetch(`${baseUrl}/Obra/${idObra}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener la data');
        }

        const data = await response.json();
        obra.value = data;

        const infoObra = {
            idObra: obra.value.obraId,
            titulo: obra.value.título,
            precio: obra.value.precioEntrada,
            diaSemana: obra.value.diaSemana,
            hora: obra.value.hora,
            minuto: obra.value.minuto,
            imagen: getImagenUrl(obra.value.imagen)
        };

        // Guarda la información de la obra en el almacén infoObra
        infoObraStore.setObraInfo(infoObra);

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

<style scoped>
h1 {
    text-align: justify;
}
</style>