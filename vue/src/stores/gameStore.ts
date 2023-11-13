import { defineStore } from 'pinia';
import {
    GAME_CONFIG,
    SPECIAL_LABELS,
    MESSAGES,
    STATUSES,
} from '../config/constants.ts';
import { checkWord } from '../utils/checkWord';

// type KeyUsed = {
//     letter: string;
//     state: string;
// };

export const useGameStore = defineStore('game', {
    state: () => ({
        currentGame: false,
        wordsList: [] as string[],
        hiddenWord: '',
        currentRound: 0,
        keyboardEnabled: false,
        attempts: [[]] as string[][],
        hits: [[]] as string[][],
        usedLettersState: new Map(),
    }),
    actions: {
        chooseHiddenWord() {
            if (this.currentGame) return;
            console.log('CHOOSING NEW WORD');
            const randomIndex = Math.floor(
                Math.random() * this.wordsList.length
            );
            this.hiddenWord = this.wordsList[randomIndex];
            console.log(this.hiddenWord);

            this.currentGame = true;
        },
        enableUI() {
            this.keyboardEnabled = true;
        },
        proccessKeyAction(keyStroke: string) {
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
            if (!letterRegex.test(letter)) {
                // Invalid keypress
                return;
            }

            const currentAttempt = this.attempts[this.currentRound];
            if (currentAttempt.length < GAME_CONFIG.NUM_LETTERS) {
                const upperCasedLetter = letter.toUpperCase();
                currentAttempt.push(upperCasedLetter);
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
            const wordAttempted: string[] = this.attempts[this.currentRound];
            console.log(wordAttempted, 'wordattempted');
            this.hits[this.currentRound] = this.checkWord(
                wordAttempted,
                this.hiddenWord
            );

            wordAttempted.forEach((letter: string, index: number) => {
                const statusLevels = Object.values(STATUSES);

                const prevStatus = this.usedLettersState.get(letter);
                const prevStatusIndex = statusLevels.indexOf(prevStatus);
                const newStatus = this.hits[this.currentRound][index];
                const newStatusIndex = statusLevels.indexOf(newStatus);

                if (newStatusIndex > prevStatusIndex) {
                    this.usedLettersState.set(
                        letter,
                        this.hits[this.currentRound][index]
                    );
                }
            });
            const isGuessed = wordAttempted.join('') === this.hiddenWord;
            const lastRound = GAME_CONFIG.NUM_ROUNDS - 1;
            console.log(this.currentRound, ' out of ', lastRound);
            if (isGuessed) {
                this.gameOver(true);
            } else if (this.currentRound === lastRound) {
                console.log('SHOULD FINISH');
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
