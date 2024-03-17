<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import urlStore from '@/store/urlApi';
import AddButaca from '@/components/Administrador/ButacaAdmin/AddButaca.vue';
import DeleteButaca from '@/components/Administrador/ButacaAdmin/DeleteButaca.vue';

const baseUrl: string = urlStore.baseUrl;

interface Asiento {
  asientoId: number;
  nombreAsiento: string;
  estado: boolean;
}

const headers = [
  { title: 'ID', key: 'asientoId' },
  { title: 'Butaca', key: 'nombreAsiento' },
  { title: 'Estado', key: 'estado' }
];

const butacas = ref<Asiento[]>([]);
const responseMessage = ref('');
const estadoSeleccionado = ref<boolean | null>(null);
const nombreButacaABuscar = ref('');
const tableKey = ref(0);

const fetchButacas = async () => {
  try {
    const response = await fetch(`${baseUrl}/Asiento`);
    if (!response.ok) {
      throw new Error('Fallo al obtener la lista de butacas.');
    }
    const data = await response.json();
    butacas.value = data;
    tableKey.value += 1;
  } catch (error) {
    console.error(error);
    responseMessage.value = 'Ha ocurrido un error al obtener la lista de butacas.';
  }
};

onMounted(fetchButacas);

const filteredButacas = computed(() => {
  return butacas.value.filter(butaca => {
    const estadoFilter = estadoSeleccionado.value === null || butaca.estado === estadoSeleccionado.value;
    const nombreFilter = nombreButacaABuscar.value === '' || butaca.nombreAsiento.toLowerCase().includes(nombreButacaABuscar.value.toLowerCase());
    return estadoFilter && nombreFilter;
  });
});

const reloadButacas = (confirmacion: boolean) => {
  if (confirmacion) {
    tableKey.value += 1;
    fetchButacas();
  }
};

const obtenerConfirmacion = (confirmacion: boolean) => {
  reloadButacas(confirmacion);
};


</script>

<template>
  <div class="contenedor">
    <h2>Lista de Butacas</h2>
    <div>
      <label for="estado">Filtrar por estado:</label>
      <select id="estado" v-model="estadoSeleccionado" @change="fetchButacas" class="custom-select">
        <option :value="null">Todos</option>
        <option :value="true">Ocupado</option>
        <option :value="false">Disponible</option>
      </select>
      <AddButaca @confirmacion="obtenerConfirmacion"></AddButaca>
    </div>
    <input type="text" v-model="nombreButacaABuscar" placeholder="Buscar por nombre..." class="input-field">
    <v-data-table  :key="tableKey" :headers="headers" :items="filteredButacas" v-if="butacas.length > 0">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.asientoId }}</td>
          <td>{{ item.nombreAsiento }}</td>
          <td>{{ item.estado ? 'Ocupado' : 'Disponible' }}</td>
          <DeleteButaca :id-butaca="item.asientoId" @confirmacion="obtenerConfirmacion"></DeleteButaca>
        </tr>
      </template>
    </v-data-table>
    <p class="response">{{ responseMessage }}</p>
  </div>
</template>

<style scoped>
.contenedor {
  width: 80%;
  margin: 0 auto;
}

.response {
  margin-top: 10px;
  color: red;
}

.custom-select {
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  outline: none;
  margin-bottom: 20px;
}

.custom-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>