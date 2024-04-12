<script setup lang="ts">
import { onMounted } from 'vue';
import { useObraInfo } from '@/store/obraInfo';

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
        <h1>{{ obra.infoObra?.título }}</h1>
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