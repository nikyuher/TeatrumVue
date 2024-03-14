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
        <div>
            <nav>
                <ul>
                    <li @click="mostrarView('info')">Información Usuario</li>
                    <li @click="mostrarView('change')">Cambiar Información</li>
                    <li>
                        <CerrarSesion></CerrarSesion>
                    </li>
                </ul>
            </nav>
            <article>
                <section>
                    <div class="wrapper">
                        <div class="form-box" v-if="vistaActual === 'info'">
                            <h2>Información Usuario</h2>
                            <InfoUser></InfoUser>
                            <Reservas></Reservas>
                        </div>
                        <div class="form-box" v-else-if="vistaActual === 'change'">
                            <h2>Cambiar Información</h2>
                            <ChangeName></ChangeName>
                        </div>
                    </div>
                </section>
            </article>
        </div>
    </main>
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
    width: 500px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px;
}
</style>
