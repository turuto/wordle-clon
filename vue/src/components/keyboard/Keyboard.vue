<template>
    <div class="keyboard">
        <div v-for="row in letters" class="keyboard__row">
            <key v-for="letter in row" :letter="letter" @key-clicked="handleKeyClicked"></key>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import Key from './components/Key.vue';
import { useGameStore } from '../../stores/gameStore';

interface KeyClickedEvent {
    letter: string;
}

const gameStore = useGameStore();

const letters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'K', 'L', 'Ñ'],
    ['SUBMIT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
]

const handleKeyPressed = (event: KeyboardEvent) => {
    console.log(event.key);
    gameStore.selectKey(event.key);
};
const handleKeyClicked = (event: KeyClickedEvent) => {
    console.log('Key clicked:', event.letter);
    gameStore.selectKey(event.letter);

};

onMounted(() => {
    window.addEventListener('keydown', handleKeyPressed);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPressed);
});
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

        gap: .5rem;
    }
}
</style>