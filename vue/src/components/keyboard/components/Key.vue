<template>
    <button @click="handleClick">{{ btnLabel }}</button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
    letter: { type: String, required: true },
})
const emit = defineEmits(['keyClicked']);

const { letter } = toRefs(props);

let btnLabel;
if (letter.value === 'DEL') {
    btnLabel = '🔙';
} else if (letter.value === 'SUBMIT') {
    btnLabel = '✔️';
} else {
    btnLabel = letter.value;
}

const handleClick = function (event) {
    emit('keyClicked', { letter: props.letter });
    event.target.blur();
};
</script>

<style scoped>
button {
    padding: .5em;

    color: salmon;
    border: 1px solid lightsalmon;
    border-radius: .2em;

    font-size: 1.1rem;
    font-weight: bold;
}

button:focus {
    outline: 2px solid green;
}
</style>