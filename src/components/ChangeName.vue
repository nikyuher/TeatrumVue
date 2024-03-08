<script setup lang="ts">
import { ref } from 'vue';
import { usarInfoUsuario } from '@/store/userInfo';

const nombre = ref<string>('');
const correo = ref<string>('');
const contraseña = ref<string>('');

const Usuario = usarInfoUsuario();
const idUsuario = Usuario.userInfo?.usuarioId;

const responseMessage = ref<string>('');

const UpdateUser = async () => {
    try {
        if (nombre.value.trim() === '' && correo.value.trim() === '' && contraseña.value.trim() === '') {
            responseMessage.value = "No hay cambios que hacer";
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
            throw new Error('No hay cambios que hacer');
        }

        const update = {
            usuarioId: idUsuario,
            nombre: nombre.value.trim() !== '' ? nombre.value.trim() : Usuario.userInfo?.nombre,
            correoElectronico: correo.value.trim() !== '' ? correo.value.trim() : Usuario.userInfo?.correoElectronico,
            contraseña: contraseña.value.trim() !== '' ? contraseña.value.trim() : Usuario.userInfo?.contraseña
        };

        const response = await fetch(`http://localhost:8001/Usuario/${idUsuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        });

        if (!response.ok) {
            throw new Error('Fallo al Hacer cambios.');
        }

        const cambioExitoso = {
            usuarioId: idUsuario !== undefined ? idUsuario : 0,
            rol: Usuario.userInfo?.rol !== undefined ? Usuario.userInfo.rol : false,
            nombre: update.nombre,
            correoElectronico: update.correoElectronico,
            contraseña: update.contraseña
        };

        if (response.ok) {
            Usuario.setUserInfo(cambioExitoso);
            responseMessage.value = "Guardado Correctamente";
            nombre.value = '';
            correo.value = '';
            contraseña.value = '';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
        }
    } catch (error) {
        responseMessage.value = "El valor ya esta en Uso";
        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
        console.log(error);
    }
}
</script>

<template>
    <v-container>
        <v-card class="ma-8">
            <v-card-title class="headline">Cambiar Información</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="UpdateUser">
                    <v-text-field v-model="nombre" label="Nombre" placeholder="Nombre Usuario"></v-text-field>
                    <v-text-field v-model="correo" label="Correo Electrónico" placeholder="correo@gmail.com"
                        type="email"></v-text-field>
                    <v-text-field v-model="contraseña" label="Contraseña" placeholder="Contraseña"
                        type="password"></v-text-field>
                    <v-btn class="mr-4" type="submit" color="primary">Guardar</v-btn>
                </v-form>
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('Guardado') ? 'success' : 'error'">
                    {{ responseMessage }}
                </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
.v-card {
    max-width: 500px;
    margin: auto;
}

.v-text-field {
    margin-bottom: 16px;
}

.v-btn {
    margin-top: 16px;
}
</style>
