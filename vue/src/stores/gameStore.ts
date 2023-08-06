import { defineStore } from 'pinia';
import { GAME_CONFIG, SPECIAL_LABELS, MESSAGES } from '../config/constants.ts';
import { checkWord } from '../utils/checkWord';

type KeyUsed = {
    letter: string;
    state: string;
};

export const useGameStore = defineStore('game', {
    state: () => ({
        wordsList: [] as string[],
        hiddenWord: '',
        currentRound: 0,
        keyboardEnabled: false,
        attempts: [[]] as string[][],
        hits: [[]] as string[][],
        lettersUsed: [] as KeyUsed[],
    }),
    actions: {
        chooseHiddenWord() {
            const randomIndex = Math.floor(
                Math.random() * this.wordsList.length
            );
            this.hiddenWord = this.wordsList[randomIndex];
            console.log(this.hiddenWord);
            this.keyboardEnabled = true;
        },
        proccessKeyAction(keyStroke: string) {
            // console.log('processing keystroke');
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
        addLetter(letter: string) {
            //need to check it's a valid letter
            const letterRegex = /^[a-zA-Z]$/;
            if (letterRegex.test(letter)) {
                const currentAttempt = this.attempts[this.currentRound];
                if (currentAttempt.length < GAME_CONFIG.NUM_LETTERS) {
                    const upperCasedLetter = letter.toUpperCase();
                    currentAttempt.push(upperCasedLetter);
                }
            } else {
                // Invalid keypress
                //  console.log('Invalid keypress');
            }
        },
        submitAttempt() {
            const currentAttempt = this.attempts[this.currentRound];
            if (currentAttempt.length < GAME_CONFIG.NUM_LETTERS) {
                console.log('WORD IS NOT COMPLETE');
                return;
            }
            // can't submit if word is not in the list
            const guess = currentAttempt.join('');
            if (!this.wordsList.includes(guess)) {
                console.log('WORD DOES NOT EXIST');
                return;
            }
            this.finishRound();
        },
        finishRound() {
            const wordAttempted = this.attempts[this.currentRound];
            this.hits[this.currentRound] = this.checkWord(
                wordAttempted,
                this.hiddenWord
            );

            wordAttempted.forEach((letter, index) => {
                const newLetter = {
                    letter,
                    state: this.hits[this.currentRound][index],
                };
                this.lettersUsed.push(newLetter);
            });
            const isGuessed = wordAttempted.join('') === this.hiddenWord;
            const lastRound = GAME_CONFIG.NUM_ROUNDS - 1;
            console.log(this.currentRound, ' out of ', lastRound);
            if (isGuessed) {
                this.gameOver(true);
            } else if (this.currentRound === lastRound) {
                console.log('SHOULD FINNISH');
                this.gameOver(false);
            } else {
                this.makeNewRound();
            }
        },
        checkWord,
        makeNewRound() {
            console.log(this.currentRound, 'MAKING NEW ROUND');
            this.currentRound++;
            this.attempts.push([]);
        },
        gameOver(hasWon: boolean) {
            console.log('GAME OVER:', hasWon, this.currentRound);
            if (hasWon) {
                console.log(MESSAGES[this.currentRound]);
            } else {
                console.log('ANOTHER TIME');
            }
        },
    },
});
