<script setup lang="ts">
import { ref, onMounted } from 'vue';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

const props = defineProps<{
  genero: string;
  mostrarSoloTres?: boolean;
  mostrarTodo?: boolean;
}>();

const itemsPerPage = ref(4);
const itemsPerPage2 = ref(4);
const obras = ref<any[]>([]);
const genero = props.genero;

onMounted(() => {
  window.addEventListener('resize', ajustarTamaño);
  ajustarTamaño();
});

const ajustarTamaño = () => {
  const width = window.innerWidth;
  if (width <= 1614) {
    itemsPerPage.value = width <= 1214 ? (width <= 814 ? 1 : 2) : 3;
  } else {
    itemsPerPage.value = 4;
  }
};

const onClickSeeAll = () => {
  itemsPerPage2.value = itemsPerPage2.value === 4 ? obras.value.length : 4;
};

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/Obra/generos?genero=${genero}`);

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

const formatearFechaHora = (fechaHora: string): string => {
    const date = new Date(fechaHora);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return date.toLocaleDateString('es-ES', options);
};

</script>

<template>
  <div v-show="mostrarSoloTres">
    <v-data-iterator :items="obras" :items-per-page="itemsPerPage">
      <template v-slot:default="{ items }">
        <div class="d-flex flex-wrap align-center justify-center pa-4 ">
          <div class="targeta d-flex row " v-for="obra in items" :key="obra.raw.obraId">
            <v-hover v-slot="{ isHovering, props }">
              <v-card v-bind="props">
                <v-img :src="getImagenUrl(obra.raw.imagen)" alt="Imagen de la obra" style="height: 450px;">
                  <v-expand-transition>
                    <div v-if="isHovering" class=" bg-red-darken-1 v-card--reveal" style="height: 100%">
                      <h3>{{ obra.raw.título }}</h3>
                      <p>{{ obra.raw.descripción.slice(0, 150) }}</p>
                      <p>Precio de entrada: ${{ obra.raw.precioEntrada }}</p>
                      <p>{{ formatearFechaHora( obra.raw.fechaHora ) }}</p>
                    </div>
                  </v-expand-transition>
                </v-img>
                <router-link :to="{ name: 'comprar', params: { idObra: obra.raw.obraId } }">
                  <v-btn>
                    Comprar
                  </v-btn>
                </router-link>
              </v-card>
            </v-hover>
          </div>
        </div>
      </template>
      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
            @click="prevPage"></v-btn>

          <div class="mx-2 text-caption">
            Pagina {{ page }} de {{ pageCount }}
          </div>

          <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal" rounded
            @click="nextPage"></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </div>
  <div v-show="!mostrarSoloTres">
    <v-data-iterator :items="obras" :items-per-page="itemsPerPage2">
      <template v-slot:default="{ items }">
        <div class="d-flex flex-wrap align-center justify-center pa-4 ">
          <div class="targeta d-flex row " v-for="obra in items" :key="obra.raw.obraId">
            <v-hover v-slot="{ isHovering, props }">
              <v-card v-bind="props">
                <v-img :src="getImagenUrl(obra.raw.imagen)" alt="Imagen de la obra" style="height: 450px;">
                  <v-expand-transition>
                    <div v-if="isHovering" class=" bg-red-darken-1 v-card--reveal" style="height: 100%">
                      <h3>{{ obra.raw.título }}</h3>
                      <p>{{ obra.raw.descripción.slice(0, 150) }}</p>
                      <p>Precio de entrada: ${{ obra.raw.precioEntrada }}</p>
                      <p>{{ formatearFechaHora( obra.raw.fechaHora ) }}</p>
                    </div>
                  </v-expand-transition>
                </v-img>
                <router-link :to="{ name: 'comprar', params: { idObra: obra.raw.obraId } }">
                  <v-btn>
                    Comprar
                  </v-btn>
                </router-link>
              </v-card>
            </v-hover>
          </div>
        </div>
      </template>
      <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center">
          <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
            <v-btn class="me-8" variant="text" @click="onClickSeeAll">
              <span class="text-decoration-underline text-none">See all</span>
            </v-btn>
          </h1>
          <div class="d-inline-flex">
            <v-btn :disabled="page === 1" class="me-2" icon="mdi-arrow-left" size="small" variant="tonal"
              @click="prevPage"></v-btn>
            <div class="mx-2 text-caption">
              Pagina {{ page }} de {{ pageCount }}
            </div>
            <v-btn :disabled="page === pageCount" icon="mdi-arrow-right" size="small" variant="tonal"
              @click="nextPage"></v-btn>
          </div>
        </div>
      </template>
    </v-data-iterator>
  </div>
</template>

<style scoped>
.targeta {
  margin: 30px 50px;
  background-color: rgb(255, 255, 255);
  width: 300px;
  height: 520px;
  border-radius: 5px;
  text-align: center;
}

.targeta2 {
  padding: 0 20px;
  margin: 30px 50px;
  background-color: rgb(209, 209, 209);
  width: 300px;
  height: 550px;
  border-radius: 5px;
}

.targeta2 img {
  height: 300px;
  margin: 20px 0 20px 0;
}

.targeta h3,
.targeta p {
  text-align: justify;
  width: 90%;
  margin: auto;
  padding: 25px;
}

.targeta2 h3,
.targeta2 p {
  text-align: left;
}

.text-black {
  color: black;
}

.v-btn {
  background-color: rgb(255, 181, 43);
}

.v-btn:hover {
  background-color: rgb(189, 108, 15);
  height: 50px;
  align-items: center;
  color: white;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>