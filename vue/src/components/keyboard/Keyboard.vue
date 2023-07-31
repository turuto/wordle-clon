<template>
    <div class="keyboard">
        <div v-for="row in letters" class="keyboard__row">
            <key v-for="letter in row" :letter="letter" @key-clicked="handleKeyClicked"></key>
        </div>
    </div>
</template>

<script setup lang="ts">
import Key from './components/Key.vue';
import { useGameStore } from '../../stores/gameStore';
const gameStore = useGameStore();

const letters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]
const handleKeyClicked = (event) => {
    console.log('Key clicked:', event.letter);
    gameStore.selectKey(event.letter);
};
</script>

<style lang="scss" scoped>
.keyboard {
    display: flex;
    flex-direction: column;

    outline: 1px solid red;

    justify-self: flex-end;
    gap: .5rem;

    &__row {
        display: flex;
        justify-content: center;
    }
}
</style>