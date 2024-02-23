<script setup lang="ts">
import { ref, onMounted } from 'vue';

const obras = ref<any[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8001/Obra');
    if (!response.ok) {
      throw new Error('No se pudo obtener la data');
    }
    const data = await response.json();
    obras.value = data;
  } catch (error) {
    console.error('Error al obtener las obras:', error);
  }
});

</script>

<template>
  <div>
    <h1>Obras de arte</h1>
    <ul>
      <li v-for="obra in obras" :key="obra.obraId">
        <p>{{ obra.genero }}</p>
        <h2>{{ obra.título }}</h2>
        <p>{{ obra.descripción }}</p>
        <p>Precio de entrada: {{ obra.precioEntrada }}</p>
      </li>
    </ul>
  </div>
</template>
  