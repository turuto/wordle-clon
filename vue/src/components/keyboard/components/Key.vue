<template>
    <button @click="handleClick">{{ btnLabel }} - {{ status }}</button>
</template>

<script setup lang="ts">
import { toRefs, computed, watch } from 'vue';
import { SPECIAL_LABELS } from '../../../config/constants';
import { useGameStore } from '../../../stores/gameStore';

const gameStore = useGameStore();

const props = defineProps({
    letter: { type: String, required: true },
});
const emit = defineEmits(['keyClicked']);

const { letter } = toRefs(props);
const status = computed(() => gameStore.lettersUsed.get(props.letter.toUpperCase()));

let btnLabel: String;
if (letter.value === SPECIAL_LABELS.DELETE) {
    btnLabel = '🔙';
} else if (letter.value === SPECIAL_LABELS.ENTER) {
    btnLabel = '✔️';
} else {
    btnLabel = letter.value;
}

const handleClick = function (event: MouseEvent) {
    emit('keyClicked', { letter: props.letter });
    (event.target as HTMLButtonElement).blur();
};
</script>

<style scoped>
button {
    padding: 0.5em;

    color: transparent;
    text-shadow: 0 0 0 salmon;
    border: 1px solid lightsalmon;
    border-radius: 0.2em;

    font-size: 1.1rem;
    font-weight: bold;
}

button:focus {
    outline: 2px solid green;
}
</style>
