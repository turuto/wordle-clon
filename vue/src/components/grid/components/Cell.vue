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
    position: relative;

    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;

    outline: 1px solid grey;

    font-size: 2rem;
    font-weight: bold;

    --cell-color: white;
    aspect-ratio: 1/1;

    &::before {
        position: absolute;
        z-index: -1;

        display: block;

        width: 100%;
        height: 100%;

        content: '';
        transform: translateY(-100%);

        background: var(--cell-color);
    }

    &--success {
        --cell-color: var(--col-success);
    }
    &--not-in-place {
        --cell-color: var(--col-warning);
    }
    &--fail {
        --cell-color: var(--col-fail);
    }

    &--success,
    &--not-in-place,
    &--fail {
        color: white;
        color: white;
        color: white;
        &::before {
            animation-name: slide-down;
            animation-duration: 0.4s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: 1;

            animation-fill-mode: forwards;
        }
    }

    &:nth-child(2)::before {
        animation-delay: 0.1s;
    }
    &:nth-child(3)::before {
        animation-delay: 0.2s;
    }
    &:nth-child(4)::before {
        animation-delay: 0.3s;
    }
    &:nth-child(5)::before {
        animation-delay: 0.4s;
    }

    @keyframes slide-down {
        to {
            transform: translateY(0);
        }
    }
}
</style>
