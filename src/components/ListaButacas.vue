<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInfoButaca } from '@/store/infoButaca';
import { useInfoAsientos } from '@/store/listaButacas'

import butacaR from '@/components/icons/IconButacaRed.vue'
import butacaG from '@/components/icons/IconButacaGreen.vue'
import butacaB from '@/components/icons/IconButacaBlue.vue'

import urlStore from '@/store/urlApi';

const props = defineProps<{
    idObra?: number;
}>();
const Butaca = useInfoButaca();

const baseUrl: string = urlStore.baseUrl;


const butacas = ref<any[]>([]);
const infoButaca = useInfoButaca();
const listButacas = useInfoAsientos()
const mostar = computed(() => listButacas.asientos);
const idObra = props.idObra;

const cambiar = ref<boolean>();

onMounted(() => {
    window.addEventListener('resize', ajustarTamaño);
    ajustarTamaño();
});

const ajustarTamaño = () => {
    const width = window.innerWidth;
    if (width <= 1060) {
        cambiar.value = false
    } else {
        cambiar.value = true
    }
};

onMounted(async () => {
    try {
        Butaca.butacasSeleccionadas = [];
        const responseAsientos = await fetch(`${baseUrl}/Asiento/disponible?estado=false`);
        const responseObra = await fetch(`${baseUrl}/Obra/${idObra}/asientos`);

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
        const response = await fetch(`${baseUrl}/Asiento/${butacaId}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener la data');
        }

        const data = await response.json();

        const Butaca = {
            asientoId: data.asientoId,
            nombreAsiento: data.nombreAsiento,
            estado: data.estado
        };

        infoButaca.ButacasSeleccionadas(Butaca);

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

const select = ref<number[]>([]);

const marcarSelecionado = (butacaId: number) => {
    const index = select.value.indexOf(butacaId);
    if (index === -1) {
        // Si el id de la butaca no está en la lista de seleccionados, lo añadimos
        select.value.push(butacaId);
    } else {
        // Si el id de la butaca está en la lista de seleccionados, lo eliminamos
        select.value.splice(index, 1);
    }
}

const ordenarAsientos = (butacas: any[]) => {
    // Crear un objeto para almacenar los asientos agrupados por letra
    const asientosPorLetra: { [letra: string]: any[] } = {};

    // Agrupar los asientos por letra
    butacas.forEach(butaca => {
        const letra = butaca.nombreAsiento.charAt(0);
        if (!asientosPorLetra[letra]) {
            asientosPorLetra[letra] = [];
        }
        asientosPorLetra[letra].push(butaca);
    });

    // Ordenar cada grupo de asientos por número
    Object.keys(asientosPorLetra).forEach(letra => {
        asientosPorLetra[letra].sort((a: any, b: any) => {
            const numeroA = parseInt(a.nombreAsiento.substring(1));
            const numeroB = parseInt(b.nombreAsiento.substring(1));
            return numeroA - numeroB;
        });
    });

    // Devolver un array de arrays de asientos ordenados
    return Object.values(asientosPorLetra);
};


</script>

<template>
    <div class="pantalla">
        <h1>Pantalla</h1>
    </div>
    <div class="cosa" v-show="cambiar">
        <div>
            <h3>Lateral Izquierdo</h3>
            <div class="bloqueA" v-for="grupoLetra in ordenarAsientos(butacasFiltradas('A'))"
                :key="grupoLetra[0].nombreAsiento.charAt(0)">
                <div v-for="butaca in grupoLetra" :key="butaca.asientoId">
                    <div class="box">
                        <template v-if="butaca.estado">
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaR :class="`cursor-not-allowed`"></butacaR>
                        </template>
                        <template v-else-if="!select.includes(butaca.asientoId)">
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaG @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                            </butacaG>
                        </template>
                        <template v-else>
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaB @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                            </butacaB>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>Centro</h3>
            <div class="bloqueB" v-for="grupoLetra in ordenarAsientos(butacasFiltradas('B'))"
                :key="grupoLetra[0].nombreAsiento.charAt(0)">
                <div v-for="butaca in grupoLetra" :key="butaca.asientoId">
                    <div class="box">
                        <template v-if="butaca.estado">
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaR :class="`cursor-not-allowed`"></butacaR>
                        </template>
                        <template v-else-if="!select.includes(butaca.asientoId)">
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaG @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                            </butacaG>
                        </template>
                        <template v-else>
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaB @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                            </butacaB>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>Lateral Derecho</h3>
            <div class="bloqueC" v-for="grupoLetra in ordenarAsientos(butacasFiltradas('C'))"
                :key="grupoLetra[0].nombreAsiento.charAt(0)">
                <div v-for="butaca in grupoLetra" :key="butaca.asientoId">
                    <div class="box">
                        <template v-if="butaca.estado">
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaR :class="`cursor-not-allowed`"></butacaR>
                        </template>
                        <template v-else-if="!select.includes(butaca.asientoId)">
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaG @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                            </butacaG>
                        </template>
                        <template v-else>
                            <p class="text-style">{{ butaca.nombreAsiento }}</p>
                            <butacaB @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                            </butacaB>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-show="!cambiar">
        <v-carousel hide-delimiters>
            <div class="cosa2">
                <v-carousel-item>
                    <div>
                        <h3>Lateral Izquierdo</h3>
                        <div class="bloqueA" v-for="grupoLetra in ordenarAsientos(butacasFiltradas('A'))"
                            :key="grupoLetra[0].nombreAsiento.charAt(0)">
                            <div v-for="butaca in grupoLetra" :key="butaca.asientoId">
                                <div class="box">
                                    <template v-if="butaca.estado">
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaR :class="`cursor-not-allowed`"></butacaR>
                                    </template>
                                    <template v-else-if="!select.includes(butaca.asientoId)">
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaG
                                            @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                                        </butacaG>
                                    </template>
                                    <template v-else>
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaB
                                            @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                                        </butacaB>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item>
                    <div>
                        <h3>Centro</h3>
                        <div class="bloqueB" v-for="grupoLetra in ordenarAsientos(butacasFiltradas('B'))"
                            :key="grupoLetra[0].nombreAsiento.charAt(0)">
                            <div v-for="butaca in grupoLetra" :key="butaca.asientoId">
                                <div class="box">
                                    <template v-if="butaca.estado">
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaR :class="`cursor-not-allowed`"></butacaR>
                                    </template>
                                    <template v-else-if="!select.includes(butaca.asientoId)">
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaG
                                            @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                                        </butacaG>
                                    </template>
                                    <template v-else>
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaB
                                            @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                                        </butacaB>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item>
                    <div>
                        <h3>Lateral Derecho</h3>
                        <div class="bloqueC" v-for="grupoLetra in ordenarAsientos(butacasFiltradas('C'))"
                            :key="grupoLetra[0].nombreAsiento.charAt(0)">
                            <div v-for="butaca in grupoLetra" :key="butaca.asientoId">
                                <div class="box">
                                    <template v-if="butaca.estado">
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaR :class="`cursor-not-allowed`"></butacaR>
                                    </template>
                                    <template v-else-if="!select.includes(butaca.asientoId)">
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaG
                                            @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                                        </butacaG>
                                    </template>
                                    <template v-else>
                                        <p class="text-style">{{ butaca.nombreAsiento }}</p>
                                        <butacaB
                                            @click="ObtenerButaca(butaca.asientoId); marcarSelecionado(butaca.asientoId)">
                                        </butacaB>
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
.pantalla {
    background-color: gray;
    text-align: center;
    width: 70%;
    margin: auto;
    margin-bottom: 30px;
}

.text-style {
    color: black;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 0;
}

.cosa2 {
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