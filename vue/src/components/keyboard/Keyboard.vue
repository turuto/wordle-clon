<template>
   <div class="keyboard">
        <div v-for="row in letters" 
             class="keyboard__row">
             <key v-for="letter in row"
                  :letter="letter"></key>
        </div>
   </div>
</template>

<script setup lang="ts">
import Key from './components/Key.vue';
const letters = [
    ['Q','W','E','R','T','Y','I','O','P'],
    ['A','S','D','F','G','H','K','L','Ñ'],
    ['Z','X','C','V','B','N','M']
] 

</script>

<style lang="scss" scoped>
.keyboard {
    outline: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-self: flex-end;
    gap: 0.5rem;
    
    &__row {
        display: flex;
        justify-content: center;
    }
}
</style>