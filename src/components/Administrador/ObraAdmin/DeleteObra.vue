<script setup lang="ts">
import { ref } from 'vue';
import { useObraInfo } from '@/store/obraInfo';

const props = defineProps<{
    idObra: number;
}>();

const emits = defineEmits(['confirmacion']);

const responseMessage = ref('');
const store = useObraInfo();

const deleteObra = async (confirmacion: boolean) => {
    try {
        
        if (!props.idObra) {
            responseMessage.value = 'Error con la Optencion del ID.';
            throw new Error('Error con la Optencion del ID.');
        }

        await store.deleteObra(props.idObra)

        responseMessage.value = 'Eliminada Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

        emits('confirmacion', confirmacion);

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
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" rounded>
                <v-icon color="white" size="32">
                    mdi-delete
                </v-icon>
            </v-btn>

        </template>
        <template v-slot:default="{ isActive }">
            <v-card title="¿Seguro que quieres Eliminarlo?">
                <v-card-text>
                    <div class="ajustar">
                        <v-btn @click="deleteObra(true)" class=" bg-blue-darken-1">
                            <input type="submit" value="Si">
                        </v-btn>
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
    color: white;
    background-color: red;
}

.v-btn:hover {
    background-color: rgb(179, 39, 39);
}
</style>
