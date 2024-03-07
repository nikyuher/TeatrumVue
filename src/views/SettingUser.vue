<script setup lang="ts">
import CerrarSesion from '@/components/CerrarSesion.vue';
import ChangeName from '@/components/ChangeName.vue';
import InfoUser from '@/components/InfoUser.vue';
</script>

<template>
    <main>
        <article>
            <section>
                <div>
                    <InfoUser></InfoUser>
                    <ChangeName></ChangeName>
                    <CerrarSesion></CerrarSesion>
                </div>
            </section>
        </article>
    </main>
</template>

<style scoped>
section {
    margin: 100px 0;
}
</style>