<script setup lang="ts">
import AddButaca from '@/components/Administrador/ButacaAdmin/AddButaca.vue';
import DeleteButaca from '@/components/Administrador/ButacaAdmin/DeleteButaca.vue';
import ListButaca from '@/components/Administrador/ButacaAdmin/ListButaca.vue';
import { ref } from 'vue';

const vistaActual = ref<string>('add');

const mostrarView = (view: string) => {
    vistaActual.value = view;
};
</script>

<template>
    <nav>
        <ul>
            <li @click="mostrarView('add')">Agregar Butaca</li>
            <li @click="mostrarView('delete')">Eliminar Butaca</li>
            <li @click="mostrarView('list')">Listar Butacas</li>
        </ul>
    </nav>
    <div class="wrapper">
        <div v-if="vistaActual === 'add'">
            <AddButaca></AddButaca>
        </div>
        <div v-else-if="vistaActual === 'list'">
            <ListButaca></ListButaca>
        </div>
        <div v-else>
            <DeleteButaca></DeleteButaca>
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
