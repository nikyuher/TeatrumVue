<script setup lang="ts">
import { ref, onMounted } from 'vue';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

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
        const response = await fetch(`${baseUrl}/Usuario`);

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
    <h2>Lista de Usuarios</h2>
    <v-container class="contenedor" style="height: 500px; overflow-y: auto;">
        <v-card v-for="usuario in usuarios" :key="usuario.usuarioId" class="usuario-card">
            <v-card-text>
                <strong>ID:</strong> {{ usuario.usuarioId }} <br>
                <strong>Nombre:</strong> {{ usuario.nombre }} <br>
                <strong>Correo:</strong> {{ usuario.correoElectronico }} <br>
                <strong>Contraseña:</strong> {{ usuario.contraseña }} <br>
                <strong>Rol:</strong> {{ usuario.rol ? 'Administrador' : 'Usuario Normal' }} <br>
            </v-card-text>
        </v-card>
        <v-alert v-if="responseMessage" :value="true" type="error" dismissible>{{ responseMessage }}</v-alert>
    </v-container>
</template>

<style scoped>
.contenedor {
    width: 100%;
    margin: 0 auto;
}

.usuario-card {
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 10px;
}
</style>