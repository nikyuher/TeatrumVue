<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import urlStore from '@/store/urlApi';
import DeleteAdd from '@/components/Administrador/UserAdmin/DeleteUser.vue';
import AdminAdd from '@/components/Administrador/UserAdmin/AddUser.vue';

const baseUrl: string = urlStore.baseUrl;
const itemsPerPage = ref<number>(10);
const search = ref<string>('');
const tableKey = ref(0);

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
        tableKey.value += 1;
    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error al obtener la lista de usuarios.';
    }
};

onMounted(fetchUsuarios);

const usuariosTable = computed(() => {
    if (search.value.trim() === '') {
        return usuarios.value;
    } else {
        const lowerCaseSearch = search.value.toLowerCase();
        return usuarios.value.filter(usuario =>
            usuario.nombre.toLowerCase().includes(lowerCaseSearch) ||
            usuario.correoElectronico.toLowerCase().includes(lowerCaseSearch)
        );
    }
});

const reloadUsuarios = (confirmacion: boolean) => {
    if (confirmacion) {
        tableKey.value += 1;
        fetchUsuarios();
    }
};

const obtenerConfirmacion = (confirmacion: boolean) => {
    reloadUsuarios(confirmacion);
};

</script>

<template>
    <v-container class="contenedor" style="height: 500px; overflow-y: auto;">
        <h2>Lista de Usuarios</h2>
        <v-text-field v-model="search" label="Buscar por nombre o correo electrónico" @change="fetchUsuarios"  outlined dense
            style="width: 250px;"></v-text-field>
        <AdminAdd @confirmacion="obtenerConfirmacion"></AdminAdd>
        <v-data-table :key="tableKey" :headers="headers" :items="usuariosTable" v-model:items-per-page="itemsPerPage">
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.usuarioId }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.correoElectronico }}</td>
                    <td>{{ item.rol ? 'Administrador' : 'Usuario' }}</td>
                    <DeleteAdd :id-obra="item.usuarioId" @confirmacion="obtenerConfirmacion"></DeleteAdd>
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
