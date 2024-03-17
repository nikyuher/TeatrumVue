<script setup lang="ts">
import { onBeforeMount, computed, onMounted, ref, watch } from 'vue';
import { usarInfoUsuario } from '@/store/userInfo';
import search from '@/components/BusquedaObra.vue'


const store = usarInfoUsuario();
const userInfo = computed(() => store.userInfo);
const windowWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

watch(windowWidth, (newWidth) => {
  if (newWidth <= 831) {
    // Ocultar el menú cuando el ancho de la ventana sea menor o igual a 556px
  }
});

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

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
      <div v-if="windowWidth <= 831">
        <router-link style="color: white; font-family: 'Radio Canada', sans-serif; text-decoration: none;"
          v-if="!userInfo" to="/login">Iniciar Sesion</router-link>
        <router-link style="color: white; font-family: 'Radio Canada', sans-serif; text-decoration: none;"
          v-if="userInfo" :to="'/setting'">{{ userInfo.nombre }}</router-link>
        <v-btn color="rgb(27, 27, 26)">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-menu activator="parent">
            <v-list style="background-color: #333;">
              <v-list-item>
                <search></search>
              </v-list-item>
              <v-list-item>
                <router-link style="color: white; font-family: 'Radio Canada', sans-serif; text-decoration: none;"
                  to="/catalogo">Catalogo</router-link>
              </v-list-item>
              <v-list-item>
                <router-link style="color: white; font-family: 'Radio Canada', sans-serif; text-decoration: none;"
                  to="/about">Contactanos</router-link>
              </v-list-item>
              <v-list-item><router-link
                  style="color: white; font-family: 'Radio Canada', sans-serif; text-decoration: none;"
                  v-if="userInfo && userInfo.rol === true" to="/admin">Administrador</router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
      <nav v-if="windowWidth > 831">
        <search></search>
        <router-link to="/catalogo">Catalogo</router-link>
        <router-link to="/about">Contactanos</router-link>
        <router-link v-if="userInfo && userInfo.rol === true" to="/admin">Administrador</router-link>
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

@media screen and (max-width: 556px) {
  .letraFooter {
    font-size: 12px;
  }


}
</style>