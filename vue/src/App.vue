

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
    fetchWords(GAME_CONFIG.NUM_LETTERS);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

const fetchWords = (numLetters: number) => {
    const searchedLength = (numLetters < 10) ? `0${numLetters}` : numLetters;
    const endpoint = `/data/${searchedLength}.txt`;
    // this timeout is just to simulate some kind of latency and to see the Loading component
    setTimeout(() => {
        fetch(endpoint)
            .then(response => response.text())
            .then(data => {
                const processedList = processList(data);
                gameStore.wordsList = [...processedList];
                isLoading.value = false;
                // const chosenWord = this.chooseWord();
                // this.manager.dictionary = this.words;
                // this.manager.startGame(chosenWord);
                // console.log('secret word is', chosenWord);
            })
            .then(gameStore.chooseWord());
    }, 1000);
};


</script>

<style scoped></style>
./utils/processList.ts