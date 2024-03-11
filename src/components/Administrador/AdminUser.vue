<script setup lang="ts">
import AdminAdd from '@/components/Administrador/UserAdmin/AddUser.vue';
import DeleteAdd from '@/components/Administrador/UserAdmin/DeleteUser.vue';
import ListUser from '@/components/Administrador/UserAdmin/ListUser.vue';
import { ref } from 'vue';

const vistaActual = ref<string>('add');

const mostrarView = (view: string) => {
    vistaActual.value = view;
};
</script>

<template>
    <nav>
        <ul>
            <li @click="mostrarView('add')">Agregar Usuario</li>
            <li @click="mostrarView('delete')">Eliminar Usuario</li>
            <li @click="mostrarView('list')">Ver Usuarios</li>
        </ul>
    </nav>
    <div class="wrapper">
        <div v-if="vistaActual === 'add'">
            <AdminAdd></AdminAdd>
        </div>
        <div v-else-if="vistaActual === 'list'">
            <ListUser></ListUser>
        </div>
        <div v-else>
            <DeleteAdd></DeleteAdd>
        </div>
    </div>
</template>

<style scoped>
nav {
    background-color: #1997ad;
    border-radius: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
}

li {
    padding: 10px;
    cursor: pointer;
    color: white;
}

li:hover {
    border-radius: 5px;
    background-color: #204a97;
}

.wrapper {
    display: flex;
    justify-content: center;
}
</style>
