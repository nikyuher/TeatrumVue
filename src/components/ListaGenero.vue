<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps<{
  genero: string;
  mostrarSoloTres?: boolean;
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

    obras.value = props.mostrarSoloTres ? data.slice(0, 4) : data;

  } catch (error) {
    console.error('Error al obtener las obras:', error);
  }
});
</script>

<template>
  <div class="Contcaja">
    <div class="targeta" v-for="obra in obras" :key="obra.obraId">
      <router-link :to="{ name: 'comprar', params: { idObra: obra.obraId } }">
        <p>{{ obra.obraId }}</p>
        <p>{{ obra.genero }}</p>
        <h3>{{ obra.título }}</h3>
        <p>{{ obra.descripción }}</p>
        <p>Precio de entrada: ${{ obra.precioEntrada }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.Contcaja {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: justify;
}

.targeta {
  padding:0 20px;
  margin: 30px 10px;
  background-color: white;
  width: 300px;
}
</style>

