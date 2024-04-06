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
    <div class="btn-pc">
        <v-btn @click="eventCerrarSesion" color="error" dark>
            Cerrar Sesión
        </v-btn>
    </div>
    <div class="btn-mobil">
        <v-btn @click="eventCerrarSesion" color="error" dark>
            Cerrar
        </v-btn>
    </div>
</template>


<style scoped>
.btn-mobil {
    display: none;
}

@media screen and (max-width: 451px) {
    .btn-mobil {
        display: block;
    }

    .btn-pc {
        display: none;
    }
}
</style>