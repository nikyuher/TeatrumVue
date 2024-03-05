<script setup lang="ts">
import AddObra from '@/components/Administrador/ObraAdmin/AddObra.vue'
import DeleteObra from '@/components/Administrador/ObraAdmin/DeleteObra.vue'
import PutInfoObra from '@/components/Administrador/ObraAdmin/PutInfoObra.vue'
import PutImgObra from '@/components/Administrador/ObraAdmin/PutImgObra.vue'
import ListObra from '@/components/Administrador/ObraAdmin/ListObra.vue'

import { ref } from 'vue';

const isAddObraView = ref<boolean>(true);
const isDeleteObraView = ref<boolean>(false);
const isPutInfoObraView = ref<boolean>(false);
const isPutImgObraView = ref<boolean>(false);
const isListObraView = ref<boolean>(false);

const showAddObra = () => {
    isAddObraView.value = true;
    isDeleteObraView.value = false;
    isPutInfoObraView.value = false;
    isPutImgObraView.value = false;
    isListObraView.value = false;
};

const showDeleteObra = () => {
    isAddObraView.value = false;
    isDeleteObraView.value = true;
    isPutInfoObraView.value = false;
    isPutImgObraView.value = false;
    isListObraView.value = false;
};

const showPutInfoObra = () => {
    isAddObraView.value = false;
    isDeleteObraView.value = false;
    isPutInfoObraView.value = true;
    isPutImgObraView.value = false;
    isListObraView.value = false;
};

const showPutImgObra = () => {
    isAddObraView.value = false;
    isDeleteObraView.value = false;
    isPutInfoObraView.value = false;
    isPutImgObraView.value = true;
    isListObraView.value = false;
};

const showListObra = () => {
    isAddObraView.value = false;
    isDeleteObraView.value = false;
    isPutInfoObraView.value = false;
    isPutImgObraView.value = false;
    isListObraView.value = true;
};
</script>

<template>
    <div>
        <nav>
            <ul>
                <li @click="showAddObra">Agregar</li>
                <li @click="showPutInfoObra">Actualizar Info</li>
                <li @click="showPutImgObra">Actualizar Imagen</li>
                <li @click="showDeleteObra">Eliminar</li>
                <li @click="showListObra">Ver Obras</li>
            </ul>
        </nav>
        <main>
            <article>
                <section>
                    <div class="wrapper">
                        <div v-if="isAddObraView">
                            <AddObra></AddObra>
                        </div>
                        <div v-else-if="isDeleteObraView">
                            <DeleteObra></DeleteObra>
                        </div>
                        <div v-else-if="isPutInfoObraView">
                            <PutInfoObra></PutInfoObra>
                        </div>
                        <div v-else-if="isPutImgObraView">
                            <PutImgObra></PutImgObra>
                        </div>
                        <div v-else-if="isListObraView"> 
                            <ListObra></ListObra>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    </div>
</template>

<style scoped>

nav {
    width: 450px;
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
