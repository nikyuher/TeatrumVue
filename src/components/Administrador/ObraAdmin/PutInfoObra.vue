<script setup lang="ts">
import { ref, computed } from 'vue';

const obraId = ref(0);
const genero = ref('');
const titulo = ref('');
const descripcion = ref('');
const precioEntrada = ref(0);
const responseMessage = ref('');

const generos =  ['comedia','terror','drama','musical','tragedia']

const updateObra = async () => {
    try {

        const obraData = {
            obraId: obraId.value,
            genero: genero.value,
            título: titulo.value,
            descripción: descripcion.value,
            precioEntrada: precioEntrada.value
        };

        const response = await fetch(`http://localhost:8001/Obra/info/${obraId.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obraData)
        });

        if (!response.ok) {
            throw new Error('Fallo al actualizar la obra.');
        }

        genero.value = ''
        titulo.value = ''
        descripcion.value = ''
        precioEntrada.value = 0

        responseMessage.value = 'Actualizado correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error al actualizar la obra.';
        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
    }
}

const descripcionLength = computed(() => descripcion.value.length);
const limitInput = () => {
    if (descripcionLength.value >= 250) {
        descripcion.value = descripcion.value.substring(0, 250);
    }
}
</script>

<template>
    <div class="contenedor">
        <h2>Actualizar Informacion</h2>
        <form @submit.prevent="updateObra" class="form">
            <div class="form-group">
                <label for="obraId">ID Obra</label>
                <input type="number" id="obraId" v-model="obraId" required>
            </div>
            <div class="form-group">
                <label for="genero">Género</label>
                <v-select v-model="genero" :items="generos" density="compact" label="generos" required></v-select>
            </div>
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" id="titulo" v-model="titulo" required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
            <input type="text" id="descripcion" v-model="descripcion" :maxlength="250" @input="limitInput" required>
            <label :class="{ 'text-red': descripcionLength < 100 }" for="descripcion">
                Descripción (Mínimo 100 caracteres): {{ descripcionLength }}/250
            </label>
            </div>
            <div class="form-group">
                <label for="precioEntrada">Precio de Entrada</label>
                <input type="number" id="precioEntrada" v-model="precioEntrada" required>
            </div>
            <div class="form-group">
                <input type="submit" value="Actualizar" class="btn-submit" :disabled="descripcionLength < 100">
            </div>
            <v-alert v-if="responseMessage" :value="true"
                :type="responseMessage.includes('Actualizado') ? 'success' : 'error'">
                {{ responseMessage }}
            </v-alert>
        </form>
    </div>
</template>

<style scoped>

.contenedor{
    width: 350px;
}

.form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="number"],
input[type="text"],
.btn-submit {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn-submit {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.response {
    margin-top: 10px;
    color: green;
}
</style>
