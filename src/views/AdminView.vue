<script setup lang="ts">
import { VEmptyState } from 'vuetify/labs/VEmptyState'
import { ref, onMounted, onBeforeMount, watch, computed} from 'vue';
import { usarInfoUsuario } from '@/store/userInfo';

import ListUser from '@/components/Administrador/UserAdmin/ListUser.vue';
import ListButaca from '@/components/Administrador/ButacaAdmin/ListButaca.vue';
import ListObra from '@/components/Administrador/ObraAdmin/ListObra.vue'


//Obtener Rol de usuiario
const infoUsuario = usarInfoUsuario();

const isAdmin = computed(() => {
    return infoUsuario.userInfo !== null && infoUsuario.userInfo.rol;
});

//Cambio de View con botones
const opcionActual = ref<string>('user');

const mostrarView = (view: string) => {
    opcionActual.value = view;
};

//Cambio de Resolucion
const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', updateWindowWidth);
});

// actualizacion del tamaño de la ventana 
onBeforeMount(() => {
    updateWindowWidth();
});

watch(windowWidth, (newWidth) => {
    if (newWidth <= 866) {
        // comentario para no de error
    }
});

</script>

<template>
    <main>
        <div v-if="isAdmin">
            <div class="contDiseñoMobil" v-if="windowWidth <= 866">
                <div class="navMobil">
                    <nav>
                        <ul>
                            <li @click="mostrarView('user')">Usuario</li>
                            <li @click="mostrarView('obra')">Obra</li>
                            <li @click="mostrarView('butaca')">Butaca</li>
                        </ul>
                    </nav>
                </div>
                <article>
                    <section>
                        <div class="form-box" v-if="opcionActual === 'user'">
                            <ListUser></ListUser>
                        </div>
                        <div class="form-box" v-else-if="opcionActual === 'obra'">
                            <ListObra></ListObra>
                        </div>
                        <div class="form-box" v-else-if="opcionActual === 'butaca'">
                            <ListButaca></ListButaca>
                        </div>
                    </section>
                </article>
            </div>
            <div class="contDiseñoWindows" v-else>
                <nav>
                    <ul>
                        <li @click="mostrarView('user')">Usuario</li>
                        <li @click="mostrarView('obra')">Obra</li>
                        <li @click="mostrarView('butaca')">Butaca</li>
                    </ul>
                </nav>
                <article>
                    <section>
                        <div class="form-box" v-if="opcionActual === 'user'">
                            <ListUser></ListUser>
                        </div>
                        <div class="form-box" v-else-if="opcionActual === 'obra'">
                            <ListObra></ListObra>
                        </div>
                        <div class="form-box" v-else-if="opcionActual === 'butaca'">
                            <ListButaca></ListButaca>
                        </div>
                    </section>
                </article>
            </div>
        </div>
        <div class="contenedorError" v-else>
            <v-empty-state headline="Whoops, 404" title="Page not found"
                text="Parece que no tienes Accseso a esta pestaña"
                image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg">
            </v-empty-state>
        </div>
    </main>
</template>

<style scoped>
/* Contenedores  */
.container {
    display: flex;
    padding: 0;
    margin: 0;
    min-height: 885px;
}

.contenedorError {
    margin: 150px auto;
    text-align: center;
}

/* Contenedor Nav para telefonos */
.navMobil {
    background-color: #333;
}

.navMobil nav {
    display: flex;
}

.navMobil ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.navMobil ul li {
    padding: 10px;
    cursor: pointer;
    color: white;
}

.navMobil ul li:hover {
    background-color: #555;
}


/* Diseño Nav para pc */
.contDiseñoWindows {
    display: flex;
}

.contDiseñoWindows nav {
    background-color: #333;
    width: 200px;
}

.contDiseñoWindows ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.contDiseñoWindows li {
    padding: 10px;
    cursor: pointer;
    color: white;
}

.contDiseñoWindows li:hover {
    background-color: #555;
}

/* Contenedor de las listas */

.form-box {
    border: 1px solid #ccc;
    min-height: 885px;
}
</style>
