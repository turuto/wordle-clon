import { defineStore } from 'pinia';
import { GAME_CONFIG, SPECIAL_LABELS } from '../config/constants.ts';

export const useGameStore = defineStore('game', {
    state: () => ({
        wordsList: [] as string[],
        hiddenWord: '',
        currentRound: 0,
        keyboardEnabled: false,
        attempts: [[]] as string[][],
        hits: [[]] as string[][],
    }),
    actions: {
        chooseHiddenWord() {
            const randomIndex = Math.floor(
                Math.random() * this.wordsList.length
            );
            this.hiddenWord = this.wordsList[randomIndex];
            this.hiddenWord = 'CRATE';
            this.keyboardEnabled = true;
        },
        proccessKeyAction(keyStroke: string) {
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
                console.log('Invalid keypress');
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
                //return;
            }
            this.finishRound();
        },
        finishRound() {
            const wordAttempted = this.attempts[this.currentRound];
            this.hits[this.currentRound] = this.checkWord(wordAttempted);
            //if  we haven't guessed and there are rounds left,
            // move this to a nakeNewRound() otherwise, gameOver()
            this.currentRound++;
            this.attempts.push([]);
        },
        checkWord(guess: string[]): string[] {
            const hiddenWordArray = this.hiddenWord.split('');
            const result = guess.map((letter, index) => {
                if (hiddenWordArray[index] === letter) {
                    return 'success';
                } else if (!hiddenWordArray.includes(letter)) {
                    return 'fail';
                } else {
                    // the letter is not in the place but present
                    // but we need to mark it as notInPlace only
                    // if there are more (not counting the ones marked as success)
                    const ocurrencesInHiddenWord = hiddenWordArray.filter(
                        (item) => item === letter
                    ).length;
                    const ocurrencesInGuess = guess.filter(
                        (item) => item === letter
                    ).length;
                    if (ocurrencesInGuess === ocurrencesInHiddenWord) {
                        return 'notInPlace';
                    } else {
                        return 'fail';
                    }
                    console.log(ocurrencesInHiddenWord, ocurrencesInGuess);
                }
            });
            console.log(hiddenWordArray);
            console.log(guess);
            console.log(result);
            // second round: find those not in place
            return ['a'];
        },
    },
});
