<script setup lang="ts">
import { ref } from 'vue'
import { useInfoAsientos } from '@/store/listaButacas';

const listButacas = useInfoAsientos();

const emits = defineEmits(['confirmacion']);
const nombre = ref('');
const estado = ref(false);
const responseMessage = ref('');

const addButaca = async () => {
    try {
        
        const confirmacion = await listButacas.addButaca(nombre.value, estado.value);

        if (confirmacion) {
            nombre.value = '';
            estado.value = false;

            responseMessage.value = 'Creado Correctamente.';

            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);

            emits('confirmacion', true);
        } else {
            throw new Error('Fallo al crear Butaca.');
        }

    } catch (error) {
        console.error(error);
        responseMessage.value = 'Ha ocurrido un Error al Crear Butaca.';

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
                    mdi-plus
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:default>
            <v-card title="Crear Butaca">
                <v-card-text>
                    <form @submit.prevent="addButaca()">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" v-model="nombre" required>
                        <label for="estado">Estado</label>
                        <select id="estado" v-model="estado" required>
                            <option :value="true">Ocupado</option>
                            <option :value="false">Disponible</option>
                        </select>
                        <input type="submit" value="Enviar">
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
select,
input[type="submit"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
    appearance: none;
    background-repeat: no-repeat;
    background-position: right 10px top 50%;
    background-size: 20px auto;
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