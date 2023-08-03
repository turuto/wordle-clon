

<template>
    <the-header v-if="!isLandscape"></the-header>
    <the-spinner v-if="isLoading"></the-spinner>
    <the-board v-if="!isLandscape && !isLoading"></the-board>
    <the-footer v-if="!isLandscape"></the-footer>
    <landscape-warning v-if="isLandscape"></landscape-warning>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { GAME_CONFIG } from './config/constants';
import { processList } from './utils/processList.ts'
import { useGameStore } from './stores/gameStore'

import TheHeader from './components/TheHeader.vue';
import TheBoard from './components/TheBoard.vue';
import TheFooter from './components/TheFooter.vue';
import LandscapeWarning from './components/LandscapeWarning.vue';
import TheSpinner from './components/TheSpinner.vue';

const gameStore = useGameStore();

const isLandscape = ref(false);
let isLoading = ref(true);

const handleResize = () => {
    const isWider = window.innerHeight < window.innerWidth;
    const isHighEnough = window.innerHeight > 400;
    isLandscape.value = isWider && !isHighEnough;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    fetchWords(GAME_CONFIG.NUM_LETTERS)
        .then(processedList => {
            if (processedList) {
                gameStore.wordsList = [...processedList];
                gameStore.chooseWord();
            };
        });

});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

const fetchWords = async (numLetters: number) => {
    const searchedLength = (numLetters < 10) ? `0${numLetters}` : numLetters;
    const endpoint = `/data/${searchedLength}.txt`;

    try {
        const response = await fetch(endpoint);
        const data = await response.text();
        const processedList = processList(data);
        isLoading.value = false;
        return processedList;
    } catch (error) {
        console.error('Failed to fetch words:', error);
    }
};




</script>

<style scoped></style>