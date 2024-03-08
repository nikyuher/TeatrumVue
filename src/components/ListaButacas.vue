<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useInfoButaca } from '@/store/infoButaca';

import butacaR from '@/components/icons/IconButacaRed.vue'
import butacaG from '@/components/icons/IconButacaGreen.vue'

const props = defineProps<{
    idObra?: number;
}>();

const butacas = ref<any[]>([]);
const infoButaca = useInfoButaca();

const idObra = props.idObra;

onMounted(async () => {
    try {
        const responseAsientos = await fetch(`http://localhost:8001/Asiento/estado/false`);
        const responseObra = await fetch(`http://localhost:8001/Obra/${idObra}/asientos`);

        if (!responseAsientos.ok || !responseObra.ok) {
            throw new Error("No se pudo obtener data");
        }

        const dataAsientos = await responseAsientos.json();
        const dataObra = await responseObra.json();

        dataObra.asientosOcupados.forEach((obraAsiento: any) => {
            const index = dataAsientos.findIndex((asiento: any) => asiento.nombreAsiento === obraAsiento.nombreAsiento);
            if (index !== -1) {
                dataAsientos[index].estado = obraAsiento.estado;
            }
        });

        butacas.value = dataAsientos;
    } catch (error) {
        console.log('Error al cargar las butacas', error)
    }
});

const fetchButaca = async (butacaId: number) => {
    try {
        const response = await fetch(`http://localhost:8001/Asiento/${butacaId}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener la data');
        }

        const data = await response.json();
        
        const Butaca = {
            asientoId: data.asientoId,
            nombreAsiento: data.nombreAsiento,
            estado: data.estado
        };

        infoButaca.setButacas(Butaca);

    } catch (error) {
        console.error('Error al obtener la butaca:', error);
    }
};

const ObtenerButaca = (butacaId: number) => {
    fetchButaca(butacaId);
}

const butacasFiltradas = (letra: string) => {
    return butacas.value.filter(butaca => butaca.nombreAsiento.startsWith(letra));
}
</script>

<template>
        <div class="bloqueA">
            <div v-for="butaca in butacasFiltradas('A')" :key="butaca.asientoId">
                <div class="box">
                    <template v-if="butaca.estado">
                        <butacaR :class="`cursor-not-allowed`" ></butacaR>
                    </template>
                    <template v-else>
                        <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                    </template>
                </div>
            </div>
        </div>
        <div class="bloqueB">
            <div v-for="butaca in butacasFiltradas('B')" :key="butaca.asientoId">
                <div class="box">
                    <template v-if="butaca.estado">
                        <butacaR :class="`cursor-not-allowed`" ></butacaR>
                    </template>
                    <template v-else>
                        <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                    </template>
                </div>
            </div>
        </div>
        <div class="bloqueC">
            <div v-for="butaca in butacasFiltradas('C')" :key="butaca.asientoId">
                <div class="box">
                    <template v-if="butaca.estado">
                        <butacaR :class="`cursor-not-allowed`" ></butacaR>
                    </template>
                    <template v-else>
                        <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                    </template>
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
</style>