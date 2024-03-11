<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInfoButaca } from '@/store/infoButaca';
import { useInfoAsientos } from '@/store/listaButacas'

import butacaR from '@/components/icons/IconButacaRed.vue'
import butacaG from '@/components/icons/IconButacaGreen.vue'

const props = defineProps<{
    idObra?: number;
}>();

const butacas = ref<any[]>([]);
const infoButaca = useInfoButaca();
const listButacas = useInfoAsientos()
const mostar = computed(() => listButacas.asientos);

const idObra = props.idObra;

const cambiar = ref<boolean>();

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
});

const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 1060) {
        cambiar.value = false
    } else {
        cambiar.value = true
    }
};

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
        listButacas.setAsientos(dataAsientos);

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
    return mostar.value.filter(butaca => butaca.nombreAsiento.startsWith(letra));
}
</script>

<template>
    <div class="cosa" v-if="cambiar">
        <div>
            <h3>Grupo A</h3>
            <div class="bloqueA">
                <div v-for="butaca in butacasFiltradas('A')" :key="butaca.asientoId">
                    <div class="box">
                        <template v-if="butaca.estado">
                            <butacaR :class="`cursor-not-allowed`"></butacaR>
                        </template>
                        <template v-else>
                            <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>Grupo B</h3>
            <div class="bloqueB">
                <div v-for="butaca in butacasFiltradas('B')" :key="butaca.asientoId">
                    <div class="box">
                        <template v-if="butaca.estado">
                            <butacaR :class="`cursor-not-allowed`"></butacaR>
                        </template>
                        <template v-else>
                            <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>Grupo C</h3>
            <div class="bloqueC">
                <div v-for="butaca in butacasFiltradas('C')" :key="butaca.asientoId">
                    <div>
                        <template v-if="butaca.estado">
                            <butacaR :class="`cursor-not-allowed`"></butacaR>
                        </template>
                        <template v-else>
                            <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <v-carousel hide-delimiters>
            <div class="cosa2">
                <v-carousel-item>
                    <div>
                        <h3>Grupo A</h3>
                        <div class="bloqueA">
                            <div v-for="butaca in butacasFiltradas('A')" :key="butaca.asientoId">
                                <div class="box">
                                    <template v-if="butaca.estado">
                                        <butacaR :class="`cursor-not-allowed`"></butacaR>
                                    </template>
                                    <template v-else>
                                        <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item>
                    <div>
                        <h3>Grupo B</h3>
                        <div class="bloqueB">
                            <div v-for="butaca in butacasFiltradas('B')" :key="butaca.asientoId">
                                <div class="box">
                                    <template v-if="butaca.estado">
                                        <butacaR :class="`cursor-not-allowed`"></butacaR>
                                    </template>
                                    <template v-else>
                                        <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item>
                    <div>
                        <h3>Grupo C</h3>
                        <div class="bloqueC">
                            <div v-for="butaca in butacasFiltradas('C')" :key="butaca.asientoId">
                                <div>
                                    <template v-if="butaca.estado">
                                        <butacaR :class="`cursor-not-allowed`"></butacaR>
                                    </template>
                                    <template v-else>
                                        <butacaG @click="ObtenerButaca(butaca.asientoId)"></butacaG>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-carousel-item>
            </div>
        </v-carousel>
    </div>
</template>

<style scoped>

.cosa2{
margin: auto
}

.cosa {
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    margin: auto;
    padding-bottom: 100px;
}

.bloqueA {
    width: 200px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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