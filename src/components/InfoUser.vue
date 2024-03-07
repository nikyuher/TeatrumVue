<script setup lang="ts">
import { computed } from 'vue';
import { usarInfoUsuario } from '@/store/userInfo';

const Usuario = usarInfoUsuario();

const userInfo = computed(() => [
    { label: 'Rol', value: Usuario.userInfo?.rol ? 'Administrador' : 'Usuario' },
    { label: 'Nombre', value: Usuario.userInfo?.nombre },
    { label: 'Correo Electrónico', value: Usuario.userInfo?.correoElectronico },
    { label: 'Contraseña', value: Usuario.userInfo?.contraseña },
]);
</script>

<template>
    <div class="caja">
        <h3 class="title">Información del Usuario</h3>
        <v-card class="info-card">
            <v-card-title class="info-title">Detalles del Usuario</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row v-for="info in userInfo" :key="info.label" class="info-row">
                        <v-col cols="4" class="info-label">{{ info.label }}:</v-col>
                        <v-col cols="8" class="info-value">{{ info.value }}</v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<style scoped>
.caja {
    text-align: center;
    margin: auto;
    padding: 20px;
    width: 400px;
}

.title {
    font-size: 24px;
    margin-bottom: 20px;
}

.info-card {
    max-width: 500px;
    margin: auto;
}

.info-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.info-label {
    font-weight: bold;
    text-align: right;
}

.info-value {
    color: #666;
}

.info-row {
    margin-bottom: 10px;
}
</style>
