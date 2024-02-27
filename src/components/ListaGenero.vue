<script setup lang="ts">
import { ref, onMounted} from 'vue';

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

const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const getImagenUrl = (imagenBytes: string) => {
  const blob = new Blob([base64ToArrayBuffer(imagenBytes)], { type: 'image/png' });
  return URL.createObjectURL(blob);
};

</script>

<template>
  <div class="Contcaja">
    <div class="targeta" v-for="obra in obras" :key="obra.obraId">
      <router-link :to="{ name: 'comprar', params: { idObra: obra.obraId } }">
        <img :src="getImagenUrl(obra.imagen)" alt="Imagen de la obra">
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
  padding: 0 20px;
  margin: 30px 10px;
  background-color: white;
  width: 300px;
}
</style>

