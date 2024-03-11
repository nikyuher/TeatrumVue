<script setup lang="ts">
import AdminUser from '@/components/Administrador/AdminUser.vue'
import AdminObra from '@/components/Administrador/AdminObra.vue'
import AdminButaca from '@/components/Administrador/AdminButaca.vue'
import { VEmptyState } from 'vuetify/labs/VEmptyState'

import { ref, computed } from 'vue';
import { usarInfoUsuario } from '@/store/userInfo';

const infoUsuario = usarInfoUsuario();

const isAdmin = computed(() => {
    // Verificar si userInfo existe y si tiene el rol de administrador
    return infoUsuario.userInfo !== null && infoUsuario.userInfo.rol;
});

const vistaActual = ref<string>('user');

const mostrarView = (view: string) => {
    vistaActual.value = view;
};
</script>

<template>
    <main>
        <div v-if="isAdmin">
            <nav>
                <ul>
                    <li @click="mostrarView('user')">Usuario</li>
                    <li @click="mostrarView('obra')">Obra</li>
                    <li @click="mostrarView('butaca')">Butaca</li>
                </ul>
            </nav>
            <article>
                <section>
                    <div class="wrapper">
                        <div class="form-box" v-if="vistaActual === 'user'">
                            <h2>Admin User</h2>
                            <AdminUser></AdminUser>
                        </div>
                        <div class="form-box" v-else-if="vistaActual === 'obra'">
                            <h2>Admin Obra</h2>
                            <AdminObra></AdminObra>
                        </div>
                        <div class="form-box" v-else-if="vistaActual === 'butaca'">
                            <h2>Admin Butaca</h2>
                            <AdminButaca></AdminButaca>
                        </div>
                    </div>
                </section>
            </article>
        </div>
        <div class="contenedor" v-else>
            <v-empty-state headline="Whoops, 404" title="Page not found"
                text="Parece que no tienes Accseso a esta pestaña"
                image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg">
            </v-empty-state>
        </div>
    </main>
</template>

<style scoped>
.contenedor {
    margin: 150px auto;
    text-align: center;
}

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
    width: 500px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px;
}
</style>
