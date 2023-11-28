<template>
    <div class="grid">
        <div
            v-for="n in GAME_CONFIG.NUM_ROUNDS"
            :key="n"
            class="grid__row"
            :class="{ 'grid__row--active': n == activeRow }"
        >
            {{ n }}
            <cell
                v-for="i in GAME_CONFIG.NUM_LETTERS"
                :key="i"
                :letter="getLetter(n, i)"
                class="grid__cell"
                :class="[getCellClassName(n, i)]"
            >
            </cell>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useGameStore } from '../../stores/gameStore';
import { GAME_CONFIG } from '../../config/constants.ts';
import Cell from './components/Cell.vue';

const gameStore = useGameStore();
const activeRow = computed(() => gameStore.currentRound + 1);
const rowsData = computed(() => gameStore.attempts);
const statusData = computed(() => gameStore.hits);

const getLetter = (row: number, index: number): string => {
    const rowData = rowsData.value[row - 1];
    if (rowData && rowData.length >= index) {
        return rowData[index - 1];
    }
    return '';
};
const getCellClassName = (row: number, index: number): string => {
    if (statusData.value && statusData.value[row - 1]) {
        const className: string = statusData.value[row - 1][index - 1];
        //changes camelCase to hyphenated
        const processedClassName =
            className === undefined
                ? ' '
                : className
                      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '\$1-\$2')
                      .toLowerCase();
        return 'grid__cell--' + processedClassName;
    }
    return '';
};

watch(rowsData, () => {
    rowsData.value;
    statusData.value;
});
</script>

<style scoped>
.grid {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.grid__row {
    display: flex;
    align-items: stretch;
    flex: 1;
    flex-direction: row;
    justify-content: center;

    padding: 1rem;

    gap: 0.5rem;
}
</style>
