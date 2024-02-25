<script setup lang="ts">

import { ref, onMounted } from 'vue'

const butacas = ref<any[]>([]);

onMounted(async () => {
    try {

        const response = await fetch(`http://localhost:8001/Asiento`);

        if (!response.ok) {
            throw new Error("No se pudo obtener data");
        }

        const data = await response.json();
        butacas.value = data;

    } catch (error) {
        console.log('Error al cargar las butacas', error)
    }
})

const butacasFiltradas = (letra: string) => {
    return butacas.value.filter(butaca => butaca.nombreAsiento.startsWith(letra));
}

</script>

<template>
    <div class="bloqueA">
        <div v-for="butaca in butacasFiltradas('A')" :key="butaca.AsientoId">
            <div class="box">
                <p>{{ butaca.nombreAsiento }}</p>
                <p>{{ butaca.estado }}</p>
            </div>
        </div>
    </div>
    <div class="bloqueB">
        <div v-for="butaca in butacasFiltradas('B')" :key="butaca.AsientoId">
            <div class="box">
                <p>{{ butaca.nombreAsiento }}</p>
                <p>{{ butaca.estado }}</p>
            </div>
        </div>
    </div>
    <div class="bloqueC">
        <div v-for="butaca in butacasFiltradas('C')" :key="butaca.AsientoId">
            <div class="box">
                <p>{{ butaca.nombreAsiento }}</p>
                <p>{{ butaca.estado }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bloqueA {
    width: 200px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.box {
    width: 100px;
    color: black;
    text-align: center;
}

.bloqueB {
    width: 400px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.bloqueC {
    width: 200px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.contenedorBloques button {

    width: 40px;
    height: 40px;
    margin: 10px 30px;
}
</style>