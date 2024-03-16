<script setup lang="ts">
import { ref, computed } from 'vue';
import urlStore from '@/store/urlApi';

const props = defineProps<{
    idObra?: number;
}>();

const emits = defineEmits(['confirmacion']);
const baseUrl: string = urlStore.baseUrl;

const obraId = ref(props.idObra);
const genero = ref('');
const dia = ref('');
const titulo = ref('');
const hora = ref(0);
const minuto = ref(0);
const descripcion = ref('');
const precioEntrada = ref(0);
const responseMessage = ref('');

const fechaHora = computed(() => {
    const fecha = dia.value ? new Date(dia.value) : new Date();
    fecha.setHours(hora.value);
    fecha.setMinutes(minuto.value);
    return fecha.toISOString();
});

const generos = ['comedia', 'terror', 'drama', 'musical', 'tragedia']
const horas = Array.from({ length: 24 }, (_, i) => i);
const minutos = Array.from({ length: 60 }, (_, i) => i);

const updateObra = async (confirmacion: boolean) => {
    try {

        const obraData = {
            obraId: obraId.value,
            genero: genero.value,
            título: titulo.value,
            fechaHora: fechaHora.value,
            descripción: descripcion.value,
            precioEntrada: precioEntrada.value
        };

        const response = await fetch(`${baseUrl}/Obra/info/${obraId.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obraData)
        });

        if (!response.ok) {
            throw new Error('Fallo al actualizar la obra.');
        }

        genero.value = ''
        titulo.value = ''
        descripcion.value = ''
        precioEntrada.value = 0

        responseMessage.value = 'Actualizado correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
        emits('confirmacion', confirmacion);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error al actualizar la obra.';
        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
    }
}

const descripcionLength = computed(() => descripcion.value.length);
const limitInput = () => {
    if (descripcionLength.value >= 250) {
        descripcion.value = descripcion.value.substring(0, 250);
    }
}
</script>

<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" rounded>
                <v-icon color="white" size="32">
                    mdi-pencil
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:default>
            <v-card title="Actualizar Informacion">
                <v-card-text>
                    <form @submit.prevent="updateObra(true)" class="form">
                        <div class="form-group">
                            <label for="genero">Género</label>
                            <v-select v-model="genero" :items="generos" density="compact" label="generos"
                                required></v-select>
                        </div>
                        <label for="fechaHora">Fecha y Hora</label>
                        <input type="date" v-model="dia" required>
                        <div class="claseTiempo">
                            <v-select v-model="hora" :items="horas" density="compact" label="horas" required></v-select>
                            <v-select v-model="minuto" :items="minutos" density="compact" label="minutos"
                                required></v-select>
                        </div>
                        <div class="form-group">
                            <label for="titulo">Título</label>
                            <input type="text" id="titulo" v-model="titulo" required>
                        </div>
                        <div class="form-group">
                            <label>Descripción</label>
                            <input type="text" id="descripcion" v-model="descripcion" :maxlength="250"
                                @input="limitInput" required>
                            <label :class="{ 'text-red': descripcionLength < 100 }" for="descripcion">
                                Descripción (Mínimo 100 caracteres): {{ descripcionLength }}/250
                            </label>
                        </div>
                        <div class="form-group">
                            <label for="precioEntrada">Precio de Entrada</label>
                            <input type="number" id="precioEntrada" v-model="precioEntrada" required>
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Actualizar" class="btn-submit"
                                :disabled="descripcionLength < 100">
                        </div>
                        <v-alert v-if="responseMessage" :value="true"
                            :type="responseMessage.includes('Actualizado') ? 'success' : 'error'">
                            {{ responseMessage }}
                        </v-alert>
                    </form>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>
.v-btn{
    background-color: rgb(58, 128, 194);
}
.v-btn:hover{
    background-color: rgb(47, 82, 148);
}

.claseTiempo {
    display: flex;
    justify-content: space-around;
}

.contenedor {
    width: 350px;
}

.form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="number"],
input[type="text"],
.btn-submit {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn-submit {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.response {
    margin-top: 10px;
    color: green;
}
</style>
