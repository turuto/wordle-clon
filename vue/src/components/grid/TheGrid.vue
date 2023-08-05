<template>
    <div class="grid">
        <div v-for="n in GAME_CONFIG.NUM_ROUNDS"
             :key="n"
             class="grid__row"
             :class="{ 'grid__row--active': n == activeRow }">
            <cell v-for="i in GAME_CONFIG.NUM_LETTERS"
			 	  :key="i"
				  :letter="splittedAttempt[i-1]"
				  class="grid__cell">
            </cell>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import { useGameStore } from '../../stores/gameStore';
import { GAME_CONFIG } from '../../config/constants.ts'
import Cell  from './components/Cell.vue';


const gameStore = useGameStore();
const activeRow = gameStore.currentRound;
const splittedAttempt = computed( () => gameStore.currentAttempt.split(''));

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

.grid__row--active {
	outline: 1px solid red;
}
</style>
