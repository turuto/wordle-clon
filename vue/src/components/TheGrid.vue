<template>
    <div class="grid">
        <div v-for="n in GAME_CONFIG.NUM_ROUNDS" :key="n" class="grid__row">
            <div v-for="i in GAME_CONFIG.NUM_LETTERS" :key="i" class="grid__cell">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore';
import { GAME_CONFIG } from '../config/constants.ts'

const gameStore = useGameStore();

</script>

<style scoped>
.grid {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.grid__row {
    display: flex;
    align-items: stretch;
    flex: 1;
    flex-direction: row;
    justify-content: center;

    padding: 1rem;

    gap: .5rem;
}

.grid__cell {
    background: palegoldenrod;

    aspect-ratio: 1/1;
}
</style>