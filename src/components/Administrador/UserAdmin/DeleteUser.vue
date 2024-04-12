<script setup lang="ts">
import { ref } from 'vue';
import { usarInfoUsuario } from '@/store/userInfo';

const props = defineProps<{
    idObra: number;
}>();

const emits = defineEmits(['confirmacion']);
const responseMessage = ref('');
const store = usarInfoUsuario();

const deleteUser = async (confirmacion: boolean) => {
    try {
        
        if (!props.idObra) {
            throw new Error('Por favor ingrese un ID de usuario válido.');
        }

        await store.deleteUser(props.idObra)

        responseMessage.value = 'Eliminado Correctamente.';

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
                        <v-btn @click="deleteUser(true)" class=" bg-blue-darken-1">
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
.ajustar{
    color: white;
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
