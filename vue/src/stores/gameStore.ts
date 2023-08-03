import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => ({
        tries: 0,
        counter: 0,
        wordsList: [] as string[],
    }),
    actions: {
        selectKey(letter: String) {
            console.log('from the store', letter);
        },
        chooseWord() {
            console.log('choosing word');
        }
    },
});