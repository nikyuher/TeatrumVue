<script setup lang="ts">
import AddObra from '@/components/Administrador/ObraAdmin/AddObra.vue'
import DeleteObra from '@/components/Administrador/ObraAdmin/DeleteObra.vue'
import PutInfoObra from '@/components/Administrador/ObraAdmin/PutInfoObra.vue'
import PutImgObra from '@/components/Administrador/ObraAdmin/PutImgObra.vue'
import ListObra from '@/components/Administrador/ObraAdmin/ListObra.vue'

import { ref } from 'vue';

const vistaActual = ref<string>('add');

const mostrarView = (view: string) => {
    vistaActual.value = view;
};
</script>

<template>
    <div>
        <nav>
            <ul>
                <li @click="mostrarView('add')">Agregar</li>
                <li @click="mostrarView('info')">Actualizar Info</li>
                <li @click="mostrarView('image')">Actualizar Imagen</li>
                <li @click="mostrarView('delete')">Eliminar</li>
                <li @click="mostrarView('list')">Ver Obras</li>
            </ul>
        </nav>
        <div class="wrapper">
            <div v-if="vistaActual === 'add'">
                <AddObra></AddObra>
            </div>
            <div v-else-if="vistaActual === 'delete'">
                <DeleteObra></DeleteObra>
            </div>
            <div v-else-if="vistaActual === 'info'">
                <PutInfoObra></PutInfoObra>
            </div>
            <div v-else-if="vistaActual === 'image'">
                <PutImgObra></PutImgObra>
            </div>
            <div v-else>
                <ListObra></ListObra>
            </div>
        </div>
    </div>
</template>

<style scoped>
nav {
    width: 100%;
    background-color: #1997ad;
    border-radius: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
}

li {
    padding: 10px;
    cursor: pointer;
    color: white;
}

li:hover {
    background-color: #204a97;
}

.wrapper {
    display: flex;
    justify-content: center;
}
</style>
