<script setup lang="ts">
import CerrarSesion from '@/components/CerrarSesion.vue';
import ChangeName from '@/components/ChangeName.vue';
import InfoUser from '@/components/InfoUser.vue';
import Reservas from '@/components/ListaReservas.vue';
import { ref } from 'vue';

const vistaActual = ref<string>('info');

const mostrarView = (view: string) => {
    vistaActual.value = view;
};
</script>

<template>
    <main>
        <div class="container">
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
    </main>
</template>

<style scoped>
.container {
    display: flex;
    margin-left: 0;
    padding: 0;
    min-height: 885px;
    justify-content:space-between;
}

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