<script setup lang="ts">
import { ref } from 'vue'

const butacaId = ref(0);
const responseMessage = ref('');

const butaca = async () => {

    try {
        const response = await fetch(`http://localhost:8001/Asiento/${butacaId.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Fallo al Eliminar Butaca.');
        }

        butacaId.value = 0

        responseMessage.value = 'Eliminado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);

    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div>
        <h2>Borrar Butaca</h2>
        <form @submit.prevent="butaca">
            <label for="butacaId">ID Butaca</label>
            <input type="number" id="butacaId" v-model="butacaId" required>
            <input type="submit" value="Enviar">
            <p class="response">{{ responseMessage }}</p>
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

input[type="number"],
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