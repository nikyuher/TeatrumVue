<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import urlStore from '@/store/urlApi';
import DeleteAdd from '@/components/Administrador/UserAdmin/DeleteUser.vue';
import AdminAdd from '@/components/Administrador/UserAdmin/AddUser.vue';

const baseUrl: string = urlStore.baseUrl;
const itemsPerPage = ref<number>(10);
interface Usuario {
    usuarioId: number;
    nombre: string;
    correoElectronico: string;
    rol: boolean;
}

const usuarios = ref<Usuario[]>([]);
const responseMessage = ref('');

const headers = [
    { title: 'ID', key: 'usuarioId' },
    { title: 'Nombre', key: 'nombre' },
    { title: 'Correo Electrónico', key: 'correoElectronico' },
    { title: 'Rol', key: 'rol' }
];

const fetchUsuarios = async () => {
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
};

onMounted(fetchUsuarios);

const usuariosTable = computed(() => usuarios.value);

</script>

<template>
    <v-container class="contenedor" style="height: 500px; overflow-y: auto;">
        <h2>Lista de Usuarios</h2>
        <AdminAdd @click="fetchUsuarios"></AdminAdd>
        <v-data-table :headers="headers" :items="usuariosTable" v-model:items-per-page="itemsPerPage">
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.usuarioId }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.correoElectronico }}</td>
                    <td>{{ item.rol ? 'Administrador' : 'Usuario' }}</td>
                    <DeleteAdd :id-obra="item.usuarioId" @click="fetchUsuarios"></DeleteAdd>
                </tr>
            </template>
        </v-data-table>
        <v-alert v-if="responseMessage" :value="true" type="error" dismissible>
            {{ responseMessage }}
        </v-alert>
    </v-container>
</template>

<style scoped>
.contenedor {
    width: 100%;
    margin: auto;
}
</style>
