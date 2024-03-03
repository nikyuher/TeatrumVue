<script setup lang="ts">
import { ref } from 'vue';

const obraId = ref(0);
const genero = ref('');
const titulo = ref('');
const descripcion = ref('');
const precioEntrada = ref(0);
const responseMessage = ref('');

const updateObra = async () => {
    try {
        if (!obraId.value) {
            throw new Error('Por favor ingrese un ID de obra válido.');
        }

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

        responseMessage.value = 'Obra actualizada correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error al actualizar la obra.';
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
                <input type="text" id="genero" v-model="genero" required>
            </div>
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" id="titulo" v-model="titulo" required>
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción</label>
                <input type="text" id="descripcion" v-model="descripcion" required>
            </div>
            <div class="form-group">
                <label for="precioEntrada">Precio de Entrada</label>
                <input type="number" id="precioEntrada" v-model="precioEntrada" required>
            </div>
            <div class="form-group">
                <input type="submit" value="Actualizar" class="btn-submit">
            </div>
            <p class="response">{{ responseMessage }}</p>
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
