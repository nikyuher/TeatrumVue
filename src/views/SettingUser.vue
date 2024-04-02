<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue';

import CerrarSesion from '@/components/CerrarSesion.vue';
import ChangeName from '@/components/ChangeName.vue';
import InfoUser from '@/components/InfoUser.vue';
import Reservas from '@/components/ListaReservas.vue';

const vistaActual = ref<string>('info');

const mostrarView = (view: string) => {
    vistaActual.value = view;
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
    if (newWidth <= 875) {
        // comentario para no de error
    }
});
</script>

<template>
    <main>
        <div v-if="windowWidth <= 875">
            <div class="navMobil">
                <nav>
                    <ul>
                        <li @click="mostrarView('info')">Información Usuario</li>
                        <li @click="mostrarView('change')">Cambiar Información</li>
                        <li @click="mostrarView('reserva')">Reservas</li>
                        <li>
                            <CerrarSesion></CerrarSesion>
                        </li>
                    </ul>
                </nav>
            </div>
            <article >
                <section>
                    <div class="form-box" v-if="vistaActual === 'reserva'">
                        <h2>Reservas</h2>
                        <Reservas></Reservas>
                    </div>
                    <div class="form-box" v-else-if="vistaActual === 'info'">
                        <h2>Información Usuario</h2>
                        <InfoUser></InfoUser>
                    </div>
                    <div class="form-box" v-else-if="vistaActual === 'change'">
                        <h2>Cambiar Información</h2>
                        <ChangeName></ChangeName>
                    </div>
                </section>
            </article>
        </div>
        <div class="container" v-else>
            <nav>
                <ul>
                    <li @click="mostrarView('info')">Información Usuario</li>
                    <li @click="mostrarView('change')">Cambiar Información</li>
                    <li @click="mostrarView('reserva')">Reservas</li>
                    <li>
                        <CerrarSesion></CerrarSesion>
                    </li>
                </ul>
            </nav>
            <article class="wrapper">
                <section>
                    <div class="form-box" v-if="vistaActual === 'reserva'">
                        <h2>Reservas</h2>
                        <Reservas></Reservas>
                    </div>
                    <div class="form-box" v-if="vistaActual === 'info'">
                        <h2>Información Usuario</h2>
                        <InfoUser></InfoUser>
                    </div>
                    <div class="form-box" v-if="vistaActual === 'change'">
                        <h2>Cambiar Información</h2>
                        <ChangeName></ChangeName>
                    </div>
                </section>
            </article>
        </div>
    </main>
</template>

<style scoped>

main{
    min-height: 800px;
}

.container {
    display: flex;
    margin-left: 0;
    padding: 0;
    min-height: 885px;
    justify-content: space-between;
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

/* Diseño para PC */
nav {
    background-color: #333;
    width: 200px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
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
    display: flex;
    justify-content: center;
    margin: auto;
}

.form-box {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px;
    flex-grow: 1;
}
</style>