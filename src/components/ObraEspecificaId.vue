<script setup lang="ts">
import { useObraInfo } from '@/store/obraInfo';
import { onMounted } from 'vue';

const props = defineProps<{
    idObra: number;
}>();

const obra = useObraInfo();
const idObra = props.idObra;

onMounted(() => {
    obra.obraEspecifica(idObra)
});

</script>

<template>
    <div v-if="obra">
        <h1>{{ obra.infoObra?.titulo }}</h1>
        <p>{{ obra.infoObra?.descripción }}</p>
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