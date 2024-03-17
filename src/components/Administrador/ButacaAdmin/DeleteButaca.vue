<script setup lang="ts">
import { ref } from 'vue'
import urlStore from '@/store/urlApi';

const props = defineProps<{
    idButaca: number;
}>();

const emits = defineEmits(['confirmacion']);
const baseUrl: string = urlStore.baseUrl;

const butacaId = ref(props.idButaca);
const responseMessage = ref('');

const deleteButaca = async (confirmacion: boolean) => {

    try {

        if (!butacaId.value) {
            responseMessage.value = 'Error con la Optencion del ID.';
            throw new Error('Error con la Optencion del ID.');
        }

        const response = await fetch(`${baseUrl}/Asiento?id=${butacaId.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            responseMessage.value = 'Error del Servidor'
            throw new Error('Error del Servidor');
        }

        responseMessage.value = 'Eliminado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);

        emits('confirmacion', confirmacion);
        
    } catch (error) {
        responseMessage.value = 'Fallo al Eliminar Butaca.'
        console.error(error);
    }
}
</script>

<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" rounded>
                <v-icon color="white" size="20">
                    mdi-delete
                </v-icon>
            </v-btn>

        </template>
        <template v-slot:default="{ isActive }">
            <v-card title="¿Seguro que quieres Eliminarlo?">
                <v-card-text>
                    <div class="ajustar">
                        <v-btn @click="deleteButaca(true)" type="submit" text="Si" class=" bg-blue-darken-1"></v-btn>
                        <v-btn text="No" @click="isActive.value = false"></v-btn>
                    </div>
                    <v-alert v-if="responseMessage" :value="true"
                        :type="responseMessage.includes('Correctamente') ? 'success' : 'error'">
                        {{ responseMessage }}
                    </v-alert>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>
.ajustar {
    display: flex;
    justify-content: space-evenly;
}

.v-btn {
    height: 30px;
    color: white;
    background-color: red;
}

.v-btn:hover {
    background-color: rgb(179, 39, 39);
}
</style>