<script setup lang="ts">
import CerrarSesion from '@/components/CerrarSesion.vue';
import ChangeName from '@/components/ChangeName.vue';
</script>

<template>
    <main>
        <article>
            <section>
                <div>
                    <ChangeName></ChangeName>
                    <CerrarSesion></CerrarSesion>
                </div>
            </section>
        </article>
    </main>
</template>

<style scoped>
section{
    margin: 100px 0;
}
</style>