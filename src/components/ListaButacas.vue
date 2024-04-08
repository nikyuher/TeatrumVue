<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInfoAsientos } from '@/store/listaButacas'

import butacaR from '@/components/icons/IconButacaRed.vue'
import butacaG from '@/components/icons/IconButacaGreen.vue'
import butacaB from '@/components/icons/IconButacaBlue.vue'

const props = defineProps<{
    idObra: number;
}>();

const listButacas = useInfoAsientos()
const mostar = computed(() => listButacas.asientos);
const select = ref<number[]>([]);
const idObra = props.idObra;

onMounted(() => {   
    listButacas.listButacasObra(idObra);
});

const fetchButaca = (butacaId: number) => {
    listButacas.butacaEspecifica(butacaId);
};

const ObtenerButaca = (butacaId: number) => {
    fetchButaca(butacaId);
}

const butacasFiltradas = (letra: string) => {
    return mostar.value.filter(butaca => butaca.nombreAsiento.startsWith(letra));
}


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
    <div class="cosa vistaWindows">
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
    <div class="vistaMobil">
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
.vistaMobil{
    display: none;
}

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
@media screen and (max-width: 1060px) {
    .vistaWindows {
        display: none;
    }

    .vistaMobil {
        display: block;
    }
}

</style>