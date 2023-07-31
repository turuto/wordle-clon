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

const handleClick = function () {
    console.log('inside the key', props.letter);
    emit('keyClicked', { letter: props.letter });
};
</script>

<style scoped>
button {
    padding: 1em;

    background: none;
}
</style>