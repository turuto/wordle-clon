<template>
    <main>
        <the-grid />
        <Keyboard></Keyboard>
    </main>
</template>

<script setup lang="ts">
import Keyboard from './keyboard/Keyboard.vue';
import TheGrid from './TheGrid.vue';

</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
</style>