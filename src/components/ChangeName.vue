<script setup lang="ts">
import { ref, computed } from 'vue';
import { usarInfoUsuario } from '@/store/userInfo'

const store = usarInfoUsuario();

const nombre = ref('');
const correo = ref('');
const contraseña = ref('');

const Usuario = usarInfoUsuario();
const idUsuario = Usuario.userInfo?.usuarioId
const butacaInfo = computed(() => Usuario.userInfo);
const responseMessage = ref('');

const UpdateUser = async () => {
    try {
        const update = {
            usuarioId: idUsuario,
            nombre: nombre.value,
            correoElectronico: correo.value,
            contraseña: contraseña.value
        };

        const response = await fetch(`http://localhost:8001/Usuario/${idUsuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        });

        if (!response.ok) {
            throw new Error('Fallo al Iniciar Sesion.');
        }

        const cambioExitoso = {
            usuarioId: idUsuario !== undefined ? idUsuario : 0,
            rol: Usuario.userInfo?.rol !== undefined ? Usuario.userInfo.rol : false,
            nombre: nombre.value
        };

        if (response.ok) {
            store.setUserInfo(cambioExitoso);
            responseMessage.value = "Guardado Correctamente"
        }

        nombre.value=''
        correo.value='' 
        contraseña.value=''
        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="caja">
        <h3>Cambiar Informacion</h3>
        <v-form @submit.prevent="UpdateUser">
            <label>Nombre Usuario {{ butacaInfo?.usuarioId }} </label>
            <v-text-field v-model="nombre" label="Nombre" hide-details required></v-text-field>
            <label>Correo Electronico</label>
            <v-text-field v-model="correo" label="Correo" hide-details required></v-text-field>
            <label>Contraseña</label>
            <v-text-field v-model="contraseña" label="Contraseña" hide-details required></v-text-field>
            <v-btn class="mt-2" type="submit" block>Guardar</v-btn>
            <p class="response">{{ responseMessage }}</p>
        </v-form>
    </div>
</template>

<style scoped>
.caja {
    text-align: center;
    margin: auto;
    padding: 20px;
    width: 300px;
    border: solid 1px black;
}

.response {
    margin-top: 10px;
    color: green;
}
</style>
