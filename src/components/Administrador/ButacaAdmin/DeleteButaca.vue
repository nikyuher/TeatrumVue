<script setup lang="ts">
import { ref } from 'vue'
import { useInfoAsientos } from '@/store/listaButacas';

const listButacas = useInfoAsientos();

const props = defineProps<{
    idButaca: number;
}>();

const emits = defineEmits(['confirmacion']);

const butacaId = ref(props.idButaca);
const responseMessage = ref('');

const deleteButaca = async () => {

    try {

        if (!butacaId.value) {
            responseMessage.value = 'Error con la Optencion del ID.';
            throw new Error('Error con la Optencion del ID.');
        }

        const confirmacion = await listButacas.deleteButaca(butacaId.value);
        
        if (confirmacion) {
            responseMessage.value = 'Eliminado Correctamente.';

            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);

            emits('confirmacion', true);
        } else {
            throw new Error('Fallo al Eliminar Butaca.');
        }
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
                        <p>{{ butacaId }}</p>
                        <v-btn @click="deleteButaca()" type="submit" text="Si" class=" bg-blue-darken-1"></v-btn>
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