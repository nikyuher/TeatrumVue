<script setup lang="ts">
import { ref, onMounted} from 'vue';

const itemsPerPage = ref(4); 

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

const handleResize = () => {
  const width = window.innerWidth;
  if (width <= 1614) {
    itemsPerPage.value = width <= 1214 ? (width <= 814 ? 1 : 2) : 3;
  } else {
    itemsPerPage.value = 4; 
  }
};

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

    obras.value = props.mostrarSoloTres ? data.slice(0, 6) : data;

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
  <v-data-iterator :items="obras" :items-per-page="itemsPerPage">
    <template v-slot:default="{ items }">   
      <div class="d-flex justify-start flex-wrap">
        <div class="targeta" v-for="obra in items" :key="obra.raw.obraId">
          <router-link :to="{ name: 'comprar', params: { idObra: obra.raw.obraId } }">
            <img :src="getImagenUrl(obra.raw.imagen)" alt="Imagen de la obra">
            <h3 class="text-black">{{ obra.raw.título }}</h3>
            <p class="text-black">{{ obra.raw.descripción }}</p>
            <p class="text-black">Precio de entrada: ${{ obra.raw.precioEntrada }}</p>
          </router-link>
        </div>
      </div>
    </template>
    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>
  
          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>
  
          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
  </v-data-iterator>
</template>

<style scoped>
.targeta {
  padding: 0 20px;
  margin: 30px 50px;
  background-color: white;
  width: 300px;
  height: 520px;
  border-radius: 5px;
}

.targeta img {
  height: 300px;
  margin: 20px 0 20px 0;
}

.targeta h3,
.targeta p {
  text-align: left;
}

.text-black {
  color: black;
}
</style>