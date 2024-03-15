<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import DeleteObra from '@/components/Administrador/ObraAdmin/DeleteObra.vue'
import AddObra from '@/components/Administrador/ObraAdmin/AddObra.vue'
import PutInfoObra from '@/components/Administrador/ObraAdmin/PutInfoObra.vue'
import PutImgObra from '@/components/Administrador/ObraAdmin/PutImgObra.vue'

import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

interface Obra {
  obraId: number;
  genero: string;
  título: string;
  descripción: string;
  precioEntrada: number;
  imagen: string;
}

const obras = ref<Obra[]>([]);
const headers = [
  { title: 'ID', key: 'obraId' },
  { title: 'Imagen', key: 'imagen' },
  { title: 'Título', key: 'título' },
  { title: 'Género', key: 'genero' },
  { title: 'Descripción', key: 'descripción' },
  { title: 'Precio', key: 'precioEntrada' },
];

const fetchObras = async () => {
  try {
    const response = await fetch(`${baseUrl}/Obra`);
    if (!response.ok) {
      throw new Error('Fallo al obtener la lista de obras.');
    }
    const data = await response.json();
    // Transformar la imagen de base64 a URL
    data.forEach((obra: Obra) => {
      obra.imagen = `data:image/jpeg;base64,${obra.imagen}`;
    });
    obras.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchObras);

const obrasTable = computed(() => obras.value);

const truncateDescription = (description: string): string => {
  return description.length > 30 ? `${description.slice(0, 30)}...` : description;
};
</script>

<template>
  <v-container>
    <h2>Listado de Obras</h2>
    <AddObra @click="fetchObras"></AddObra>
    <v-data-table :headers="headers" :items="obrasTable" item-key="obraId">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.obraId }}</td>
          <td><v-img :src="item.imagen" height="55" contain /></td>
          <td>{{ truncateDescription(item.título) }}</td>
          <td>{{ item.genero }}</td>
          <td>{{ truncateDescription(item.descripción) }}</td>
          <td>${{ item.precioEntrada }}</td>
          <PutInfoObra :id-obra="item.obraId" @click="fetchObras"></PutInfoObra>
          <PutImgObra :id-obra="item.obraId" @click="fetchObras"></PutImgObra>
          <DeleteObra :id-obra="item.obraId" @click="fetchObras"></DeleteObra>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>

</style>
