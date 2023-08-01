<template>
    <p class="spinner">
        Loading...
    </p>
</template>

<script setup lang="ts"></script>
<style>
@keyframes spinning {
    from {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.spinner {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;

    animation: spinning 1s infinite;
}
</style>