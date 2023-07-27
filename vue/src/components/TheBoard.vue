<template>
   <main>
        <p>
            The Bard
        </p>
        <Keyboard></Keyboard>
    </main>
</template>

<script setup lang="ts">
import Keyboard from './keyboard/Keyboard.vue';

</script>

<style scoped>
main {
    background: cyan;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

</style>