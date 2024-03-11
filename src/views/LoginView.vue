<script setup lang="ts">

import Register from '@/components/RegistrarUsuario.vue'
import Loguear from '@/components/LoguearUsuario.vue'

import { ref } from 'vue';

const isRegisterView = ref<boolean>(false);

const showRegisterForm = () => {
  isRegisterView.value = true;
};

const showLoginForm = () => {
  isRegisterView.value = false;
};

</script>

<template>
  <main>
    <article>
      <section>
        <div :class="{ 'wrapper': true, 'active': isRegisterView }">
          <div class="form-box login">
            <h2>Login</h2>
            <Loguear></Loguear>
            <div class="login-register">
              <p>Don't have an account?<a href="#" class="register-link" @click="showRegisterForm">Register</a></p>
            </div>
          </div>
          <div class="form-box register">
            <h2>Registration</h2>
            <Register></Register>
            <div class="login-register">
              <p>Already have an account?<a href="#" class="login-link" @click="showLoginForm">Login</a></p>
            </div>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
}

.logo {
  font-size: 4em;
  user-select: none;
  font-family: 'Courier New', Courier, monospace;
}

.logo a {
  color: rgb(238, 45, 45);
}

.logo a:hover {
  color: rgb(167, 15, 15);
}

.wrapper {
  position: relative;
  width: 400px;
  height: 440px;
  background: transparent;
  border: 2px solid rgb(255, 255, 255, .5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: .2s ease;
}

.wrapper .form-box {
  width: 100%;
  padding: 40px;
}

.wrapper.active {
  height: 520px;
}

.wrapper.active .form-box.login {
  transition: none;
  transform: translateX(-400px);
}

.wrapper .form-box.login {
  transition: .18s ease;
  transform: translateX(0);
}

.wrapper .form-box.register {
  position: absolute;
  transition: none;
  transform: translateX(400px);
}

.wrapper.active .form-box.register {
  transition: .18s ease;
  transform: translateX(0);
}

.form-box h2 {
  font-size: 2em;
  color: rgb(21, 28, 85);
  text-align: center;
}


.login-register {
  font-size: .9em;
  color: rgb(21, 28, 85);
  text-align: center;
  font-weight: 500;
  margin: 25px 0 10px;
}

.login-register p a {
  color: rgb(21, 28, 85);
  text-decoration: none;
  font-weight: 600;
}

.login-register p a:hover {
  text-decoration: underline;
}
</style>