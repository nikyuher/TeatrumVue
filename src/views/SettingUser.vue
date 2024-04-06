<script setup lang="ts">
import { ref } from 'vue';

import CerrarSesion from '@/components/CerrarSesion.vue';
import ChangeName from '@/components/ChangeName.vue';
import InfoUser from '@/components/InfoUser.vue';
import Reservas from '@/components/ListaReservas.vue';

const vistaActual = ref<string>('info');

const mostrarView = (view: string) => {
    vistaActual.value = view;
};
</script>

<template>
    <main>
        <div class="navMobil">
            <nav>
                <ul>
                    <li @click="mostrarView('info')">Información</li>
                    <li @click="mostrarView('change')">Modificar</li>
                    <li @click="mostrarView('reserva')">Reservas</li>
                    <li>
                        <CerrarSesion></CerrarSesion>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="container">
            <nav class="navWindows">
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
                        <h2>Información</h2>
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
main {
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

.navMobil {
    display: none;
}

/* Estilos para pantallas */
@media screen and (max-width: 875px) {
    .navWindows {
        display: none;
    }

    .navMobil {
        display: block;
    }
}
</style>