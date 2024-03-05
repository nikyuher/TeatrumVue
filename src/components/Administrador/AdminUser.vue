<script setup lang="ts">
import AdminAdd from '@/components/UserAdmin/AddUser.vue';
import DeleteAdd from '@/components/UserAdmin/DeleteUser.vue';
import ListUser from '@/components/UserAdmin/ListUser.vue';
import { ref } from 'vue';

const isAddUserView = ref<boolean>(true);
const isListUserView = ref<boolean>(false);

const showAddUser = () => {
    isAddUserView.value = true;
    isListUserView.value = false;
};

const showDeleteUser = () => {
    isAddUserView.value = false;
    isListUserView.value = false;
};

const showListUser = () => {
    isAddUserView.value = false;
    isListUserView.value = true;
};
</script>

<template>
    <nav>
        <ul>
            <li @click="showAddUser">Agregar Usuario</li>
            <li @click="showDeleteUser">Eliminar Usuario</li>
            <li @click="showListUser">Ver Usuarios</li>
        </ul>
    </nav>
    <main>
        <article>
            <section>
                <div class="wrapper">
                    <div v-if="isAddUserView">
                        <AdminAdd></AdminAdd>
                    </div>
                    <div v-else-if="isListUserView"> 
                        <ListUser></ListUser>
                    </div>
                    <div v-else>
                        <DeleteAdd></DeleteAdd>
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
