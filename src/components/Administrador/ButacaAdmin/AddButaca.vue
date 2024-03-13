<script setup lang="ts">
import { ref } from 'vue'
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

const nombre = ref('');
const estado = ref(false);
const responseMessage = ref('');

const butaca = async () => {

    try {
        const crear = {
            nombreAsiento: nombre.value,
            estado: estado.value
        };

        const response = await fetch(`${baseUrl}/Asiento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crear)
        });

        if (!response.ok) {
            throw new Error('Fallo al crear Butaca.');
        }

        nombre.value = ''
        estado.value = false

        responseMessage.value = 'Creado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un Error al Crear .';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
    }
}
</script>

<template>
    <div>
        <h2>Crear Butaca</h2>
        <form @submit.prevent="butaca">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="nombre" required>
            <label for="estado">Estado</label>
            <select id="estado" v-model="estado" required>
                <option :value="true">Ocupado</option>
                <option :value="false">Disponible</option>
            </select>
            <input type="submit" value="Enviar">
            <v-alert v-if="responseMessage" :value="true"
                :type="responseMessage.includes('Creado') ? 'success' : 'error'">
                {{ responseMessage }}
            </v-alert>
        </form>
    </div>
</template>

<style scoped>
form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="text"],
select,
input[type="submit"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
    appearance: none;
    background-repeat: no-repeat;
    background-position: right 10px top 50%;
    background-size: 20px auto;
}

input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.response {
    margin-top: 10px;
    color: green;
}
</style>