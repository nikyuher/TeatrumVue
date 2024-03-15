<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const terminos = ref(false);
const responseMessage = ref('');
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validarPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
};

const validarName = (name: string): boolean => {
    return name.length >= 4;
};

const registerUser = async () => {
    
    if (!validarName(username.value)) {
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
    
    
    if (!terminos.value) {
        responseMessage.value = 'Por favor acepte los Términos & Condiciones';
        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
        return;
    }

    const userData = {
        nombre: username.value,
        correoElectronico: email.value,
        contraseña: password.value
    };
    
    try {
        const response = await fetch(`${baseUrl}/Usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Fallo al registrar al usuario.');
        }

        username.value = '';
        email.value = '';
        password.value = '';
        terminos.value = false;

        responseMessage.value = 'Registrado Correctamente.';
        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);

    } catch (error) {
        responseMessage.value = 'Error al Registrarte';
        console.error(error);
        
        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
    }
};
</script>

<template>
    <form @submit.prevent="registerUser">
        <div class="input-box">
            <input type="text" v-model="username" required>
            <label>Nombre</label>
        </div>
        <div class="input-box">
            <input type="email" v-model="email" required>
            <label>Correo</label>
        </div>
        <div class="input-box">
            <input type="password" v-model="password" required>
            <label>Contraseña</label>
        </div>
        <div class="remember-forgot">
            <label><input type="checkbox" v-model="terminos">Acepto los términos y condiciones</label>
        </div>
        <button class="btn" type="submit">Resgistrar</button>
        <v-alert v-if="responseMessage" :value="true" :type="responseMessage.includes('Registrado') ? 'success' : 'error'">
            {{ responseMessage }}
        </v-alert>
    </form>
</template>

<style scoped>
.respuesta p {
    border: 1px solid green;
    color: green;
    padding: 5px;
    background: rgb(146, 233, 143);
    border-radius: 5px;
    font-size: 20px;
}

.respuesta h3 {
    border: 1px solid rgb(119, 38, 38);
    color: rgb(119, 38, 38);
    padding: 5px;
    background: rgb(236, 125, 125);
    border-radius: 5px;
    font-size: 20px;
}

.input-box {
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgb(21, 28, 85);
    margin: 30px 0;
}

.input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: rgb(21, 28, 85);
    font-weight: 500;
    pointer-events: none;
    transition: .5s;
}

.input-box input:focus~label,
.input-box input:valid~label {
    top: -5px
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: rgb(21, 28, 85);
    font-weight: 600;
    padding: 0 35px 0 5px;
}

.input-box .icon {
    position: absolute;
    right: 8px;
    font-size: 1.2em;
    color: rgb(21, 28, 85);
    line-height: 57px;
}

.btn {
    width: 100%;
    height: 45px;
    background-color: rgb(21, 28, 85);
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    color: white;
    font-weight: 500;
}

.remember-forgot {
    font-size: .9em;
    color: rgb(21, 28, 85);
    font-weight: 500;
    margin: -15px 0 15px;
    display: flex;
    justify-content: space-between;
}

.remember-forgot label input {
    accent-color: rgb(21, 28, 85);
    margin: 3px;
}

.remember-forgot a {
    color: rgb(21, 28, 85);
    text-decoration: none;
}

.remember-forgot a:hover {
    text-decoration: underline;
}
</style>