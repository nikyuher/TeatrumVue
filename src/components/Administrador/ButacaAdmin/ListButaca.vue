<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useInfoAsientos } from '@/store/listaButacas';

import AddButaca from '@/components/Administrador/ButacaAdmin/AddButaca.vue';
import DeleteButaca from '@/components/Administrador/ButacaAdmin/DeleteButaca.vue';

const headers = [
  { title: 'ID', key: 'asientoId' },
  { title: 'Butaca', key: 'nombreAsiento' },
  { title: 'Estado', key: 'estado' }
];

const listButacas = useInfoAsientos();
const responseMessage = ref('');
const estadoSeleccionado = ref<boolean | null>(null);
const nombreButacaABuscar = ref('');
const tableKey = ref(0);

onMounted(() => {
  listButacas.allButacas();
});

const filteredButacas = computed(() => {
  return listButacas.asientos.filter(butaca => {
    const estadoFilter = estadoSeleccionado.value === null || butaca.estado === estadoSeleccionado.value;
    const nombreFilter = nombreButacaABuscar.value === '' || butaca.nombreAsiento.toLowerCase().includes(nombreButacaABuscar.value.toLowerCase());
    return estadoFilter && nombreFilter;
  });
});

const reloadButacas = (confirmacion: boolean) => {
  if (confirmacion) {
    tableKey.value += 1;
    listButacas.allButacas();
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
      <select id="estado" v-model="estadoSeleccionado" @change="listButacas.allButacas" class="custom-select">
        <option :value="null">Todos</option>
        <option :value="true">Ocupado</option>
        <option :value="false">Disponible</option>
      </select>
      <AddButaca @confirmacion="obtenerConfirmacion"></AddButaca>
    </div>
    <input type="text" v-model="nombreButacaABuscar" placeholder="Buscar por nombre..." class="input-field">
    <v-data-table  :key="tableKey" :headers="headers" :items="filteredButacas" v-if="listButacas.asientos.length > 0">
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