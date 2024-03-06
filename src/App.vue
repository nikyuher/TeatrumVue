<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { usarInfoUsuario } from '@/store/userInfo';

const store = usarInfoUsuario();
const userInfo = computed(() => store.userInfo);

onBeforeMount(() => {
  store.loadUserInfo();
});
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
        <router-link v-if="userInfo && userInfo.nombre === 'admin'" to="/admin">Administrador</router-link>
        <router-link v-if="!userInfo" to="/login">Iniciar Sesion</router-link>
        <router-link v-if="userInfo" :to="'/setting'">{{ userInfo.nombre }}</router-link>
      </nav>
    </div>
  </header>
  <router-view />
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

<style scoped>
/*Barra de Navegacion*/
.contOpciones {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(27, 27, 26);
  color: white;
  font-family: 'Radio Canada', sans-serif;
}

.contOpciones nav a {
  color: white;
  text-decoration: none;
  padding: 20px;
}

/*Tipo de letra exclusivo del footer*/
.letraFooter * {
  font-family: monospace;
}

/*Footer*/
.contFooter {
  background-color: rgb(27, 27, 26);
  height: 280px;
  text-align: center;
}

.cajaRedes {
  display: grid;
  padding: 30px 0;
  grid-template-columns: 40% auto 40%;
}

.cajaVacia {
  border-bottom: 1px solid;
  margin: 0 30px;
  height: 12px;
  width: auto;
}

.iconosRedes {
  display: flex;
}

.iconosRedes a {
  width: 100%;
  font-size: 22px;
  text-decoration: none;
}

.reglamento {
  display: flex;
  justify-content: center;
}

.barrera {
  border-right: solid 1px;
  padding-right: 10px;
  margin-right: 10px;
}
@media screen and (max-width: 556px){
  .contOpciones {
    flex-direction: column;
    align-items: center;
  }
  
  .contOpciones nav {
    margin-top: 20px;
  }
  
  .contOpciones nav a {
    padding: 10px;
    font-size: 14px;
  }

  .letraFooter {
    font-size: 12px;
  }

  .iconosRedes a {
    font-size: 18px;
  }
}
</style>