<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usarInfoUsuario } from '@/store/userInfo';


const store = usarInfoUsuario();

const email = ref('');
const password = ref('');
const responseMessage = ref('');

const router = useRouter();

const login = async () => {
  try {
    const login = {
      correoElectronico: email.value,
      contraseña: password.value
    };

    await store.loginUser(login)

    email.value = '';
    password.value = '';

    responseMessage.value = 'Inicio Sesion Correctamente.';

    if (!store.userInfo.rol) {
      router.push('/');
    } else {
      router.push('/admin')
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(error);

      responseMessage.value = error.message || 'Error al Iniciar Sesion.';
      setTimeout(() => {
        responseMessage.value = '';
      }, 2000);
    } else {
      throw new Error(String(error));
    }
  }
};
</script>

<template>
  <form @submit.prevent="login">
    <div class="input-box">
      <input type="email" v-model="email" required>
      <label>Correo</label>
    </div>
    <div class="input-box">
      <input type="password" v-model="password" required>
      <label>Contraseña</label>
    </div>
    <div class="remember-forgot">
      <label>
        <input type="checkbox">
        Recuerdame
      </label>
      <a href="#">¿Olvidaste tu contraseña?</a>
    </div>
    <button class="btn" type="submit">Login</button>
    <v-alert v-if="responseMessage" :value="true"
      :type="responseMessage.includes('Correctamente') ? 'success' : 'error'">
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