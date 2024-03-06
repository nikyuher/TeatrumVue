<script setup lang="ts">
import { usarInfoUsuario } from '@/store/userInfo';
import { useRouter } from 'vue-router';

const Usuario = usarInfoUsuario();
const router = useRouter();

const eventCerrarSesion = async () => {

    try {

        Usuario.setUserInfo(null)

        router.push('/');
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="contenedor">
        <form @submit.prevent="eventCerrarSesion">
            <label>Cerrar Sesion</label>
            <input type="submit" value="Cerrar Sesion">
        </form>
    </div>
</template>

<style scoped>
.contenedor {
    margin: auto;
    width: 300px;
    height: 500px;
    border: solid 1px black;
}
</style>