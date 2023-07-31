<template>
    <button @click="handleClick">{{ letter }}</button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
    letter: { type: String, required: true },
})
const emit = defineEmits(['keyClicked']);

const { letter } = toRefs(props);

const handleClick = function (event) {
    emit('keyClicked', { letter: props.letter });
    event.target.blur();
};
</script>

<style scoped>
button {
    padding: 1em;

    background: none;
}

button:focus {
    outline: 2px solid green;
}
</style>