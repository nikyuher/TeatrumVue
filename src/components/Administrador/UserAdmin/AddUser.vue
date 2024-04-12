<script setup lang="ts">
import { ref } from 'vue'
import { usarInfoUsuario } from '@/store/userInfo';

const emits = defineEmits(['confirmacion']);
const store = usarInfoUsuario();

const nombre = ref('');
const email = ref('');
const password = ref('');
const responseMessage = ref('');

const validarEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

const validarPassword = (value: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(value);
};

const validarName = (value: string): boolean => {
    return value.length >= 4;
};

const addUser = async (confirmacion: boolean) => {

    try {
        if (!validarName(nombre.value)) {
            responseMessage.value = 'El nombre debe tener al menos 4 caracteres';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
            return;
        }

        if (!validarEmail(email.value)) {
            responseMessage.value = 'Por favor ingrese un correo electrónico válido';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
            return;
        }

        if (!validarPassword(password.value)) {
            responseMessage.value = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
            return;
        }

        const crear = {
            nombre: nombre.value,
            correoElectronico: email.value,
            contraseña: password.value
        };

        await store.addUser(crear)

        nombre.value = ''
        email.value = ''
        password.value = ''

        responseMessage.value = 'Creado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

        emits('confirmacion', confirmacion);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);

            responseMessage.value = error.message || 'Error al Crear Usuario.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
        } else {
            throw new Error(String(error));
        }
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
            <v-card title="Crear Usuario">
                <v-card-text>
                    <form @submit.prevent="addUser(true)" class="form">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" id="nombre" v-model="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Correo</label>
                            <input type="email" id="email" v-model="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" id="password" v-model="password" required>
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Enviar" class="btn-submit">
                        </div>
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

.v-btn{
    background-color: rgb(54, 143, 54);
}
.v-btn:hover{
    background-color: rgb(39, 102, 39);
}

.form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
.btn-submit {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn-submit {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.response {
    margin-top: 10px;
    color: green;
}
</style>
