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

const search = ref('');
const obras = ref<Obra[]>([]);
const responseMessage = ref('');
const tableKey = ref(0);

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
    tableKey.value += 1;
  } catch (error) {
    console.error(error);
    responseMessage.value = 'Ha ocurrido un error al obtener la lista de obras.';
  }
};

onMounted(fetchObras);

const BuscadorObras = computed(() => {
  return obras.value.filter(obra =>
    obra.título.toLowerCase().includes(search.value.toLowerCase()) ||
    obra.genero.toLowerCase().includes(search.value.toLowerCase())
  );
});

const truncateDescription = (description: string): string => {
  return description.length > 30 ? `${description.slice(0, 30)}...` : description;
};

const reloadObras = (confirmacion: boolean) => {
  if (confirmacion) {
    tableKey.value += 1;
    fetchObras();
  }
};

const obtenerConfirmacion = (confirmacion: boolean) => {
  reloadObras(confirmacion);
};

</script>

<template>
  <v-container>
    <h2>Listado de Obras</h2>
    <v-text-field v-model="search" label="Buscar" outlined @change="fetchObras" dense style="width: 250px;"></v-text-field>
    <AddObra @confirmacion="obtenerConfirmacion"></AddObra>
    <v-data-table :key="tableKey" :headers="headers" :items="BuscadorObras" item-key="obraId" v-if="obras.length > 0">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.obraId }}</td>
          <td><v-img :src="item.imagen" height="55" contain /></td>
          <td>{{ truncateDescription(item.título) }}</td>
          <td>{{ item.genero }}</td>
          <td>{{ truncateDescription(item.descripción) }}</td>
          <td>${{ item.precioEntrada }}</td>
          <PutInfoObra :id-obra="item.obraId" @confirmacion="obtenerConfirmacion"></PutInfoObra>
          <PutImgObra :id-obra="item.obraId" @confirmacion="obtenerConfirmacion"></PutImgObra>
          <DeleteObra :id-obra="item.obraId" @confirmacion="obtenerConfirmacion"></DeleteObra>
        </tr>
      </template>
    </v-data-table>
    <p class="response">{{ responseMessage }}</p>
  </v-container>
</template>

<style scoped>
/* Estilos */
</style>
