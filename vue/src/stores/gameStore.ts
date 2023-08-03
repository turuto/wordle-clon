import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => ({
        wordsList: [] as string[],
        hiddenWord: '',
        currentRound: 0,
        keyboardEnabled: false,
        currentAttempt: '',
    }),
    actions: {
        selectKey(letter: String) {
            console.log('from the store', letter);
        },
        chooseHiddenWord() {
            const randomIndex = Math.floor(Math.random() * this.wordsList.length);
            this.hiddenWord = this.wordsList[randomIndex];
            this.keyboardEnabled = true;
        }
    },
});