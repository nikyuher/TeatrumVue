<script setup lang="ts">
import { ref } from 'vue';
import urlStore from '@/store/urlApi';

const props = defineProps<{
    idObra?: number;
}>();

const baseUrl: string = urlStore.baseUrl;

const responseMessage = ref('');

const deleteUser = async () => {
    try {
        if (!props.idObra) {
            throw new Error('Por favor ingrese un ID de usuario válido.');
        }

        const response = await fetch(`${baseUrl}/Usuario/${props.idObra}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Fallo al eliminar Usuario.');
        }

        responseMessage.value = 'Eliminado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

    } catch (error) {
        console.error(error);
        responseMessage.value = 'No se a podido Eliminar.';
        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
    }
}
</script>

<template>
    <v-btn @click="deleteUser" rounded>
        <v-icon color="white" size="32">
            mdi-delete
        </v-icon>
    </v-btn>
</template>

<style scoped>
.v-btn {
    background-color: red;
}

.v-btn:hover {
    background-color: rgb(179, 39, 39);
}
</style>
