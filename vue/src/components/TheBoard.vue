<template>
    <main>
        <p class="grid">
            The Board
        </p>
        <Keyboard></Keyboard>
    </main>
</template>

<script setup lang="ts">
import Keyboard from './keyboard/Keyboard.vue';

</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.grid {
    flex: 1;
}
</style>