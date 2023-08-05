import { defineStore } from 'pinia';
import { GAME_CONFIG, SPECIAL_LABELS } from '../config/constants.ts';

export const useGameStore = defineStore('game', {
    state: () => ({
        wordsList: [] as string[],
        hiddenWord: '',
        currentRound: 0,
        keyboardEnabled: false,
        attempts: [[]] as string[][],
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
            console.log('processing keystroke');
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
            const currentAttempt = this.attempts[this.currentRound];
            if (currentAttempt.length > 0) {
                currentAttempt.pop();
            }
        },
        addLetter(letter: String) {
            const currentAttempt = this.attempts[this.currentRound];
            if (currentAttempt.length < GAME_CONFIG.NUM_LETTERS) {
                const upperCasedLetter = letter.toUpperCase();
                currentAttempt.push(upperCasedLetter);
            }
            console.log('currentAttempt,', currentAttempt, this.attempts);
        },
        submitAttempt() {
            let currentAttempt = this.attempts[this.currentRound];
            if (currentAttempt.length < GAME_CONFIG.NUM_LETTERS) {
                console.log('WORD IS NOT COMPLETE');
                return;
            }
            this.makeNewRound();
        },
        makeNewRound() {
            this.currentRound++;
            this.attempts.push([]);
        },
    },
});
