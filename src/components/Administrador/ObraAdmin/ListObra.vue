<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
  { title: 'Imagen', key: 'imagen' },
  { title: 'ID', key: 'obraId' },
  { title: 'Título', key: 'título' },
  { title: 'Género', key: 'genero' },
  { title: 'Descripción', key: 'descripción' },
  { title: 'Precio', key: 'precioEntrada' },
];

onMounted(async () => {
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
});

const truncateDescription = (description: string): string => {
  return description.length > 30 ? `${description.slice(0, 30)}...` : description;
};
</script>

<template>
  <v-container>
    <h2>Listado de Obras</h2>
    <v-data-table :headers="headers" :items="obras" item-key="obraId">
      <template v-slot:item="{ item }">
        <tr>
          <td><v-img :src="item.imagen" height="55" contain /></td>
          <td>{{ item.obraId }}</td>
          <td>{{ truncateDescription(item.título) }}</td>
          <td>{{ item.genero }}</td>
          <td>{{ truncateDescription(item.descripción) }}</td>
          <td>${{ item.precioEntrada }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.contenedor {
  width: 100%;
  margin: auto;
}
</style>
