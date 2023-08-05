<template>
    <div class="grid__cell">
        {{ letter }}
    </div>
</template>

<script setup lang="ts">
const letter:string='a';
</script>

<style scoped lang="scss">
.grid__cell {
    outline:1px solid grey;
    font-size: 2rem;
    font-weight: bold;
	aspect-ratio: 1/1;
    display:flex;
    justify-content:center;
    align-items:center;

    &--right{
        background:green;
        color:white;
    }
    &--semiright{
        background:yellow;
        color:white;
    }
}


</style>