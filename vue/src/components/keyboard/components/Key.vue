<template>
    <button @click="handleClick" :class="[className]">
        {{ btnLabel }}
    </button>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { SPECIAL_LABELS } from '../../../config/constants';
import { useGameStore } from '../../../stores/gameStore';

const gameStore = useGameStore();

const props = defineProps({
    letter: { type: String, required: true },
});
const emit = defineEmits(['keyClicked']);

const { letter } = toRefs(props);
const status = computed(() =>
    gameStore.usedLettersState.get(props.letter.toUpperCase())
);
const className = computed(() => {
    if (status.value === undefined) {
        return undefined;
    }
    const statusValue = String(status.value);
    //changes camelCase to hyphenated
    return statusValue
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '\$1-\$2')
        .toLowerCase();
});

let btnLabel: String;
if (letter.value === SPECIAL_LABELS.DELETE) {
    btnLabel = '🔙';
} else if (letter.value === SPECIAL_LABELS.ENTER) {
    btnLabel = '✔️';
} else {
    btnLabel = letter.value.toUpperCase();
}

const handleClick = function (event: MouseEvent) {
    emit('keyClicked', { letter: props.letter });
    (event.target as HTMLButtonElement).blur();
};
</script>

<style scoped>
button {
    padding: 0.5em;
    flex: 1;

    color: transparent;
    border: 1px solid #222222;
    border-radius: 0.2em;
    text-shadow: 0 0 0 #555555;

    font-size: 1.1rem;
    font-weight: bold;
}

button:focus {
    outline: 2px solid green;
}

button.success {
    color: white;
    background: var(--col-success);
}
button.not-in-place {
    color: white;
    background: var(--col-warning);
}
button.fail {
    color: white;
    background: grey;
}
</style>
