<script setup lang="ts">
import { ref, computed } from 'vue';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

interface ObraData {
    genero: string;
    título: string;
    descripción: string;
    fechaHora: string;
    precioEntrada: number;
    imagen: string | null;
}

const emits = defineEmits(['confirmacion']);
const img = ref<File | null>(null);
const genero = ref('');
const dia = ref('');
const titulo = ref('');
const descri = ref('');
const precio = ref(0);
const hora = ref(0);
const minuto = ref(0);
const responseMessage = ref('');
const imageDataUrl = ref<string | null>(null);

const fechaHora = computed(() => {
    const fecha = dia.value ? new Date(dia.value) : new Date();
    fecha.setHours(hora.value);
    fecha.setMinutes(minuto.value);
    return fecha.toISOString();
});

const generos = ['comedia', 'terror', 'drama', 'musical', 'tragedia']
const horas = Array.from({ length: 24 }, (_, i) => i);
const minutos = Array.from({ length: 60 }, (_, i) => i);

const obra = async (confirmacion: boolean) => {
    try {
        let obraData: ObraData = {
            imagen: null,
            genero: genero.value,
            título: titulo.value,
            descripción: descri.value,
            fechaHora: fechaHora.value,
            precioEntrada: precio.value
        };

        if (img.value) {
            const base64Image = await fileToBase64(img.value);
            obraData = {
                ...obraData,
                imagen: base64Image
            };
        }

        const response = await fetch(`${baseUrl}/Obra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obraData)
        });

        if (!response.ok) {
            throw new Error('Fallo al crear la obra.');
        }

        genero.value = '';
        titulo.value = '';
        descri.value = '';
        precio.value = 0;
        hora.value = 0; 
        minuto.value = 0; 

        responseMessage.value = 'Creado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

        emits('confirmacion', confirmacion);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un Error al Crear .';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
    }
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        img.value = file;
        const reader = new FileReader();
        reader.onload = () => {
            imageDataUrl.value = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}

// Función para convertir un archivo a una cadena de datos base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Obtener la cadena base64 sin el prefijo 'data:image/jpeg;base64,' o similar
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
}

const descripcionLength = computed(() => descri.value.length);
const limitInput = () => {
    if (descripcionLength.value >= 250) {
        descri.value = descri.value.substring(0, 250);
    }
}
</script>


<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" rounded>
                <v-icon color="white" size="32">
                    mdi-plus
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:default>
            <v-card title="Crear Obra">
                <v-card-text>
                    <form @submit.prevent="obra(true)">
                        <label for="imagen">Imagen</label>
                        <input type="file" id="imagen" accept="image/*" @change="handleFileChange" required>
                        <div v-if="imageDataUrl">
                            <img :src="imageDataUrl" alt="Imagen seleccionada"
                                style="max-width: 100%; height: 200px; margin-bottom: 10px;">
                        </div>
                        <label for="genero">Género</label>
                        <v-select v-model="genero" :items="generos" density="compact" label="generos"
                            required></v-select>
                        <label for="fechaHora">Fecha y Hora</label>
                        <input type="date" v-model="dia" required>
                        <div class="claseTiempo">
                            <v-select v-model="hora" :items="horas" density="compact" label="horas" required></v-select>
                            <v-select v-model="minuto" :items="minutos" density="compact" label="minutos"
                                required></v-select>
                        </div>
                        <label for="titulo">Título</label>
                        <input type="text" id="titulo" v-model="titulo" required>
                        <label>Descripción</label>
                        <input type="text" id="descripcion" v-model="descri" :maxlength="250" @input="limitInput"
                            required>
                        <label :class="{ 'text-red': descripcionLength < 100 }" for="descripcion">
                            Descripción (Mínimo 100 caracteres): {{ descripcionLength }}/250
                        </label>
                        <label for="precio">Precio</label>
                        <input type="number" id="precio" v-model="precio" required>
                        <input type="submit" value="Enviar" :disabled="descripcionLength < 100">
                        <v-alert v-if="responseMessage" :value="true"
                            :type="responseMessage.includes('Creado') ? 'success' : 'error'">
                            {{ responseMessage }}
                        </v-alert>
                    </form>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>


<style scoped>
.v-btn {
    background-color: rgb(54, 143, 54);
}

.v-btn:hover {
    background-color: rgb(39, 102, 39);
}

.claseTiempo {
    display: flex;
    justify-content: space-around;
}

form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="text"],
input[type="number"],
input[type="file"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.response {
    margin-top: 10px;
    color: green;
}
</style>