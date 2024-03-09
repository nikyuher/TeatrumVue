<script setup lang="ts">
import { ref, onMounted } from 'vue';
interface Obra {
  obraId: number;
  genero: string;
  título: string;
  descripción: string;
  precioEntrada: number;
  imagen: string; // Imagen en base64
}

const obras = ref<Obra[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8001/Obra');
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
</script>

<template>
  <v-container>
    <h2>Listado de Obras</h2>
    <v-row>
      <v-col cols="12">
        <div class="obra-container">
          <v-card v-for="obra in obras" :key="obra.obraId" class="obra-card">
            <v-img :src="obra.imagen" height="200"></v-img>
            <v-card-title class="obra-title">{{ obra.título }}</v-card-title>
            <v-card-text>
              <p><strong>ID:</strong> {{ obra.obraId }}</p>
              <p><strong>Género:</strong> {{ obra.genero }}</p>
              <p><strong>Descripción:</strong> {{ obra.descripción }}</p>
              <p><strong>Precio de entrada:</strong> ${{ obra.precioEntrada }}</p>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.obra-container {
  max-height: 800px;
  overflow-y: auto;
  width: 100%;
}

.obra-card {
  margin-bottom: 20px;
  border-radius: 10px;
}

.obra-title {
  white-space: normal;
}
</style>