<template>
    <div class="keyboard">
        <div v-for="row in KEYBOARD_CONFIG" class="keyboard__row">
            <key
                v-for="letter in row"
                :letter="letter"
                @key-clicked="handleKeyClicked"
            ></key>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { KEYBOARD_CONFIG } from '../../config/constants';
import Key from './components/Key.vue';
import { useGameStore } from '../../stores/gameStore';

interface KeyClickedEvent {
    letter: string;
}

const gameStore = useGameStore();

const handleKeyPressed = (event: KeyboardEvent) => {
    console.log('KEY PRESSED:', event.key);
    gameStore.proccessKeyAction(event.key);
};
const handleKeyClicked = (event: KeyClickedEvent) => {
    console.log('Key clicked:', event.letter);
    gameStore.proccessKeyAction(event.letter);
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

    padding-block: 1rem;
    justify-self: flex-end;
    gap: 0.5rem;

    &__row {
        display: flex;
        justify-content: center;

        gap: 0.5rem;
    }
}
</style>
