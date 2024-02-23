<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="contOpciones">
      <div class="logo">
        <router-link to="/">
          <h1>Teatrum</h1>
        </router-link>
      </div>
      <nav>
        <router-link to="/estrenos">Proximos Estrenos</router-link>
        <router-link to="/catalogo">Catalogo</router-link>
        <router-link to="/about">Contactanos</router-link>
        <router-link to="/login">Iniciar Sesion</router-link>
      </nav>
    </div>
  </header>
  <main>
    <router-view />
  </main>

  <footer>
    <div class="contFooter">
      <div class="cajaRedes letraFooter colorFooter">
        <div class="cajaVacia"></div>
        <div class="iconosRedes ">
          <a href="https://www.youtube.com"><i class="bi bi-youtube"></i></a>
          <a href="https://twitter.com"><i class="bi bi-twitter-x"></i></a>
          <a href="https://instagram.com"><i class="bi bi-instagram"></i></a>
          <a href="https://facebook.com"><i class="bi bi-facebook"></i></a>
        </div>
        <div class="cajaVacia"></div>
      </div>
      <div class="logo colorFooter">
        <h1>Teatrum</h1>
      </div>
      <div class="copyright letraFooter colorFooter">
        <p>Copyright©2023 Teatrum, Inc.</p>
      </div>
      <div class="reglamento letraFooter colorFooter">
        <p class="barrera">Informacion Legal</p>
        <p>Politica de Privacidad</p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
