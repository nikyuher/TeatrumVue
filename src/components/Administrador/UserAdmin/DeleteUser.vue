<script setup lang="ts">
import { ref } from 'vue';

const userId = ref(0);
const responseMessage = ref('');

const deleteUser = async () => {
    try {
        if (!userId.value) {
            throw new Error('Por favor ingrese un ID de usuario válido.');
        }

        const response = await fetch(`http://localhost:8001/Usuario/${userId.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Fallo al eliminar Usuario.');
        }

        responseMessage.value = 'Eliminado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error.';
    }
}
</script>

<template>
    <div>
        <h2>Eliminar Usuario</h2>
        <form @submit.prevent="deleteUser" class="form">
            <div class="form-group">
                <label for="userId">ID Usuario</label>
                <input type="number" id="userId" v-model="userId" required>
            </div>
            <div class="form-group">
                <input type="submit" value="Enviar" class="btn-submit">
            </div>
            <v-alert v-if="responseMessage" :value="true"
                :type="responseMessage.includes('Eliminado') ? 'success' : 'error'">
                {{ responseMessage }}
            </v-alert>
        </form>
    </div>
</template>

<style scoped>

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
