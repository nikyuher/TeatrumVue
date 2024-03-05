<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Obra {
    obraId: number;
    genero: string;
    título: string;
    descripción: string;
    precioEntrada: number;
}

const obras = ref<Obra[]>([]);

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8001/Obra');
        if (!response.ok) {
            throw new Error('Fallo al obtener la lista de obras.');
        }
        const data = await response.json();
        obras.value = data;
    } catch (error) {
        console.error(error);
    }
});

</script>

<template>
    <div>
        <h2>Listado de Obras</h2>
        <ul>
            <li v-for="obra in obras" :key="obra.obraId">
                <h3>{{ obra.título }}</h3>
                <p><strong>ID:</strong> {{ obra.obraId }}</p>
                <p><strong>Género:</strong> {{ obra.genero }}</p>
                <p><strong>Descripción:</strong> {{ obra.descripción }}</p>
                <p><strong>Precio de entrada:</strong> ${{ obra.precioEntrada }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    padding: 0;
    list-style: none;
}

li {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
}

h3 {
    margin-top: 0;
}
</style>
