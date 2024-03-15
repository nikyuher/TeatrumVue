<script setup lang="ts">
import { ref } from 'vue';
import urlStore from '@/store/urlApi';

const props = defineProps<{
    idObra: number;
}>();


const baseUrl: string = urlStore.baseUrl;

const obraId = ref(props.idObra);
const img = ref<File | null>(null);
const responseMessage = ref('');
const imageDataUrl = ref<string | null>(null);

const updateImage = async () => {
    try {
        
        if (!img.value) {
            throw new Error('Por favor seleccione una imagen.');
        }

        const base64Image = await fileToBase64(img.value);

        const PutImgObra = {
            obraId: obraId.value,
            imagen: base64Image
        };

        const response = await fetch(`${baseUrl}/Obra/img/${obraId.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PutImgObra)
        });

        if (!response.ok) {
            throw new Error('Fallo al actualizar la imagen de la obra.');
        }


        responseMessage.value = 'Actualizado correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un error al actualizar la imagen de la obra.';
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
</script>

<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" rounded>
                <v-icon color="white" size="32">
                    mdi-paperclip
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:default>
            <v-card title="Actualizar Imagen">
                <v-card-text>
                    <form @submit.prevent="updateImage">
                        <label for="imagen">Nueva Imagen</label>
                        <input type="file" id="imagen" accept="image/*" @change="handleFileChange" required>
                        <div v-if="imageDataUrl">
                            <img :src="imageDataUrl" alt="Imagen seleccionada"
                                style="max-width: 100%; height: 200px; margin-bottom: 10px;">
                        </div>
                        <input type="submit" value="Enviar">
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
.v-btn {
    background-color: rgb(58, 128, 194);
}

.v-btn:hover {
    background-color: rgb(47, 82, 148);
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
