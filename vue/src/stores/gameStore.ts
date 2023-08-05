import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => ({
        wordsList: [] as string[],
        hiddenWord: '',
        currentRound: 1,
        keyboardEnabled: false,
        currentAttempt: '',
    }),
    actions: {
        addLetter(letter: String) {
            const upperCasedLetter = letter.toUpperCase()
            // solo añadir if hay hueco, si no, saltar al nuevo attempt
            this.currentAttempt += upperCasedLetter;
        },
        chooseHiddenWord() {
            const randomIndex = Math.floor(Math.random() * this.wordsList.length);
            this.hiddenWord = this.wordsList[randomIndex];
            this.keyboardEnabled = true;
        },
    },
});