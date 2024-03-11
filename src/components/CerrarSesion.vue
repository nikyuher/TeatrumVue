<script setup lang="ts">
import { usarInfoUsuario } from '@/store/userInfo';
import { useRouter } from 'vue-router';

const Usuario = usarInfoUsuario();
const router = useRouter();

const eventCerrarSesion = async () => {
    try {
        Usuario.setUserInfo(null);
        router.push('/');
    } catch (error) {
        console.log(error);
    }
};

</script>

<template>
    <v-btn @click="eventCerrarSesion" color="error" dark>
        Cerrar Sesión
    </v-btn>
</template>


<style scoped>
.contenedor {
    margin: auto;
    width: 300px;
    height: 500px;
    text-align: center;
    border: solid 1px black;
}
</style>