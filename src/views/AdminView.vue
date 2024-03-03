<script setup lang="ts">
import AdminUser from '@/components/AdminUser.vue'
import AdminObra from '@/components/AdminObra.vue'
import AdminButaca from '@/components/AdminButaca.vue'
import { ref } from 'vue';

const isAdminUserView = ref<boolean>(true);
const isAdminObraView = ref<boolean>(false);
const isAdminButacaView = ref<boolean>(false);

const showAdminUser = () => {
    isAdminUserView.value = true;
    isAdminObraView.value = false;
    isAdminButacaView.value = false;
};

const showAdminObra = () => {
    isAdminUserView.value = false;
    isAdminObraView.value = true;
    isAdminButacaView.value = false;
};

const showAdminButaca = () => {
    isAdminUserView.value = false;
    isAdminObraView.value = false;
    isAdminButacaView.value = true;
};
</script>

<template>
    <div>
        <nav>
            <ul>
                <li @click="showAdminUser">Usuario</li>
                <li @click="showAdminObra">Obra</li>
                <li @click="showAdminButaca">Butaca</li>
            </ul>
        </nav>
        <main>
            <article>
                <section>
                    <div class="wrapper">
                        <div class="form-box" v-if="isAdminUserView">
                            <h2>Admin User</h2>
                            <AdminUser></AdminUser>
                        </div>
                        <div class="form-box" v-if="isAdminObraView">
                            <h2>Admin Obra</h2>
                            <AdminObra></AdminObra>
                        </div>
                        <div class="form-box" v-if="isAdminButacaView">
                            <h2>Admin Butaca</h2>
                            <AdminButaca></AdminButaca>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    </div>
</template>

<style scoped>
nav {
    background-color: #333;
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
    background-color: #555;
}

.wrapper {
    margin: 100px 0;
    display: flex;
    justify-content: center;
}

.form-box {
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px;
}
</style>