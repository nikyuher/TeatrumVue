<script setup lang="ts">
import { ref } from 'vue'

const nombre = ref('');
const email = ref('');
const password = ref('');
const responseMessage = ref('');

const addUser = async () => {

    try {
        const crear = {
            nombre: nombre.value,
            correoElectronico: email.value,
            contraseña: password.value
        };

        const response = await fetch('http://localhost:8001/Usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crear)
        });

        if (!response.ok) {
            responseMessage.value = 'Fallo al crear Usuario.';
            throw new Error('Fallo al Ingresar Usuario.');
        }

        nombre.value = ''
        email.value = ''
        password.value = ''

        responseMessage.value = 'Creado Correctamente.';

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
    <div class="contenedor">
        <h2>Crear Usuario</h2>
        <form @submit.prevent="addUser" class="form">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" v-model="nombre" required>
            </div>
            <div class="form-group">
                <label for="email">Correo</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div class="form-group">
                <input type="submit" value="Enviar" class="btn-submit">
            </div>
            <p class="response">{{ responseMessage }}</p>
        </form>
    </div>
</template>

<style scoped>

.contenedor{
    width: 300px;
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

input[type="text"],
input[type="email"],
input[type="password"],
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