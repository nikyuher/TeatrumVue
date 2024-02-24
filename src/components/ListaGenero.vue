<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps<{
  genero: string;
}>();

const obras = ref<any[]>([]);
const genero = props.genero;

onMounted(async () => {
  try {

    const response = await fetch(`http://localhost:8001/Obra/generos/${genero}`);

    if (!response.ok) {
      throw new Error('No se pudo obtener la data');
    }

    const data = await response.json();
    obras.value = data;

  }
  catch (error) {
    console.error('Error al obtener las obras:', error);
  }
});
</script>

<template>
  <div class="Contcaja">
    <div class="targeta" v-for="obra in obras" :key="obra.obraId">
      <router-link to="/comprar">
        <p>{{ obra.genero }}</p>
        <h3>{{ obra.título }}</h3>
        <p>{{ obra.descripción }}</p>
        <p>Precio de entrada: {{ obra.precioEntrada }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.Contcaja {
  display: flex;
  text-decoration: none;
}

.targeta {
  margin: 10px auto;

  background-color: white;
  width: 300px;
}
</style>

