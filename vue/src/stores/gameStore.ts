import { defineStore } from 'pinia';
import { GAME_CONFIG, SPECIAL_LABELS } from '../config/constants.ts';

export const useGameStore = defineStore('game', {
    state: () => ({
        wordsList: [] as string[],
        hiddenWord: '',
        currentRound: 1,
        keyboardEnabled: false,
        currentAttempt: '',
    }),
    actions: {
        chooseHiddenWord() {
            const randomIndex = Math.floor(
                Math.random() * this.wordsList.length
            );
            this.hiddenWord = this.wordsList[randomIndex];
            this.keyboardEnabled = true;
        },
        proccessKeyAction(keyStroke: String) {
            if (keyStroke === SPECIAL_LABELS.DELETE) {
                this.removeLetter();
                return;
            } else if (keyStroke === SPECIAL_LABELS.ENTER) {
                this.submitAttempt();
                return;
            }
            this.addLetter(keyStroke);
        },
        removeLetter() {
            if (this.currentAttempt.length > 0) {
                this.currentAttempt = this.currentAttempt.slice(0, -1);
            }
        },
        addLetter(letter: String) {
            if (this.currentAttempt.length < GAME_CONFIG.NUM_LETTERS) {
                const upperCasedLetter = letter.toUpperCase();
                this.currentAttempt += upperCasedLetter;
            }
        },
        submitAttempt() {
            if (this.currentAttempt.length === GAME_CONFIG.NUM_LETTERS) {
                console.log('SUBMITTINF');
            } else {
                console.log('WORD IS NOT COMPLETE');
            }
        },
    },
});
