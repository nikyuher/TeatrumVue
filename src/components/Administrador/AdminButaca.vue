<script setup lang="ts">
import AddButaca from '@/components/Administrador/ButacaAdmin/AddButaca.vue';
import DeleteButaca from '@/components/Administrador/ButacaAdmin/DeleteButaca.vue';
import ListButaca from '@/components/Administrador/ButacaAdmin/ListButaca.vue';
import { ref } from 'vue';

const isAddButacaView = ref<boolean>(true);
const isListButacaView = ref<boolean>(false);

const showAddButaca = () => {
    isAddButacaView.value = true;
    isListButacaView.value = false;
};

const showDeleteButaca = () => {
    isAddButacaView.value = false;
    isListButacaView.value = false;
};

const showListButaca = () => {
    isAddButacaView.value = false;
    isListButacaView.value = true;
};
</script>

<template>
    <nav>
        <ul>
            <li @click="showAddButaca">Agregar Butaca</li>
            <li @click="showDeleteButaca">Eliminar Butaca</li>
            <li @click="showListButaca">Listar Butacas</li>
        </ul>
    </nav>
    <main>
        <article>
            <section>
                <div class="wrapper">
                    <div v-if="isAddButacaView">
                        <AddButaca />
                    </div>
                    <div v-else-if="isListButacaView">
                        <ListButaca />
                    </div>
                    <div v-else>
                        <DeleteButaca />
                    </div>
                </div>
            </section>
        </article>
    </main>
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
