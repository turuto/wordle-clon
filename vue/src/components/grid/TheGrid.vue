<template>
    <div class="grid">
        <div v-for="n in GAME_CONFIG.NUM_ROUNDS"
             :key="n"
             class="grid__row"
             :class="{ 'grid__row--active': n == activeRow }">
			 {{ n }} {{ activeRow }}
            <cell v-for="i in GAME_CONFIG.NUM_LETTERS"
			 	  :key="i"
				  :letter="getLetter(n,i)"
				  class="grid__cell">
            </cell>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { useGameStore } from '../../stores/gameStore';
import { GAME_CONFIG } from '../../config/constants.ts'
import Cell  from './components/Cell.vue';

const gameStore = useGameStore();
const activeRow = gameStore.currentRound;
const splittedAttempt = computed( () => gameStore.currentAttempt.split(''));

const getLetter = (row:number, index:number):string => {

	if (row === activeRow) {
		return splittedAttempt.value[index - 1];
	}
	return '';
}
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
