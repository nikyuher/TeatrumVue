<script setup lang="ts">
import { ref } from 'vue';

interface ObraData {
    genero: string;
    título: string;
    descripción: string;
    precioEntrada: number;
    imagen: string | null;
}

const img = ref<File | null>(null);
const genero = ref('');
const titulo = ref('');
const descri = ref('');
const precio = ref(0);
const responseMessage = ref('');
const imageDataUrl = ref<string | null>(null);

const obra = async () => {
    try {
        let obraData: ObraData = {
            genero: genero.value,
            título: titulo.value,
            descripción: descri.value,
            precioEntrada: precio.value,
            imagen: null
        };

        if (img.value) {
            const base64Image = await fileToBase64(img.value);
            obraData = {
                ...obraData,
                imagen: base64Image
            };
        }

        const response = await fetch('http://localhost:8001/Obra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obraData)
        });

        if (!response.ok) {
            throw new Error('Fallo al crear la obra.');
        }

        img.value = null;
        genero.value = '';
        titulo.value = '';
        descri.value = '';
        precio.value = 0;

        responseMessage.value = 'Creado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);

    } catch (error) {
        console.error(error);
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
</script>


<template>
    <div>
        <h2>Crear Obra</h2>
        <form @submit.prevent="obra">
            <label for="imagen">Imagen</label>
            <input type="file" id="imagen" accept="image/*" @change="handleFileChange" required>
            <div v-if="imageDataUrl">
                <img :src="imageDataUrl" alt="Imagen seleccionada"
                    style="max-width: 100%; height: 200px; margin-bottom: 10px;">
            </div>
            <label for="genero">Género</label>
            <input type="text" id="genero" v-model="genero" required>
            <label for="titulo">Título</label>
            <input type="text" id="titulo" v-model="titulo" required>
            <label for="descripcion">Descripción</label>
            <input type="text" id="descripcion" v-model="descri" required>
            <label for="precio">Precio</label>
            <input type="number" id="precio" v-model="precio" required>
            <input type="submit" value="Enviar">
            <v-alert v-if="responseMessage" :value="true"
                :type="responseMessage.includes('Creado') ? 'success' : 'error'">
                {{ responseMessage }}
            </v-alert>
        </form>
    </div>
</template>


<style scoped>
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