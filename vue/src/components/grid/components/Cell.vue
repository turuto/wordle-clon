<template>
    <div class="grid__cell">
        {{ letter }}
    </div>
</template>

<script setup lang="ts">
defineProps({
    letter: String,
});
</script>

<style scoped lang="scss">
.grid__cell {
    display: flex;
    align-items: center;
    justify-content: center;

    outline: 1px solid grey;

    font-size: 2rem;
    font-weight: bold;

    aspect-ratio: 1/1;

    &--success {
        color: white;
        background: var(--col-success);
    }
    &--not-in-place {
        color: white;
        background: var(--col-warning);
    }
}
</style>
