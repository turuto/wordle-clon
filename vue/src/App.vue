

<template>
    <the-header v-if="!isLandscape"></the-header>
    <the-board v-if="!isLandscape"></the-board>
    <the-footer v-if="!isLandscape"></the-footer>
    <landscape-warning v-if="isLandscape"></landscape-warning>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
//import { useGameStore } from './stores/gameStore'

import TheHeader from './components/TheHeader.vue';
import TheBoard from './components/TheBoard.vue';
import TheFooter from './components/TheFooter.vue';
import LandscapeWarning from './components/LandscapeWarning.vue';

const isLandscape = ref(false);

const handleResize = () => {
    const isWider = window.innerHeight < window.innerWidth;
    const isHighEnough = window.innerHeight > 400;
    isLandscape.value = isWider && !isHighEnough;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Call the method initially to set the initial value of isLandscape
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

//const gameStore = useGameStore();

</script>

<style scoped></style>
