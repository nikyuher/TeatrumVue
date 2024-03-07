<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Usuario {
    usuarioId: number;
    rol: boolean;
    nombre: string;
    correoElectronico: string;
    contraseña: string;
}

const usuarios = ref<Usuario[]>([]);
const responseMessage = ref('');

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8001/Usuario');

        if (!response.ok) {
            throw new Error('Fallo al obtener la lista de usuarios.');
        }

        const data = await response.json();
        usuarios.value = data;

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error al obtener la lista de usuarios.';
    }
});

</script>

<template>
    <div class="contenedor">
        <h2>Lista de Usuarios</h2>
        <ul class="lista-usuarios">
            <li v-for="usuario in usuarios" :key="usuario.usuarioId" class="usuario-item">
                <div class="usuario-info">
                    <p><strong>ID:</strong> {{ usuario.usuarioId }}</p>
                    <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
                    <p><strong>Correo:</strong> {{ usuario.correoElectronico }}</p>
                    <p><strong>Contaseña:</strong> {{ usuario.contraseña }}</p>
                    <p><strong>Rol:</strong> {{ usuario.rol ? 'Administrador' : 'Usuario Normal' }}</p>
                    <p class="response">{{ responseMessage }}</p>
                </div>
            </li>
        </ul>
        <p class="response">{{ responseMessage }}</p>
    </div>
</template>

<style scoped>
.contenedor {
    width: 80%;
    margin: 0 auto;
}

.lista-usuarios {
    list-style-type: none;
    padding: 0;
}

.usuario-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.usuario-info {
    font-size: 16px;
}

.response {
    margin-top: 10px;
    color: red;
}
</style>
