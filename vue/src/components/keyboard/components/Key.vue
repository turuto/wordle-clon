<template>
   <button>{{ letter }}</button>
</template>

<script setup lang="ts">
defineProps(['letter'])
</script>

<style scoped>
button {
    padding: 1em;
    background: none;
}
</style>