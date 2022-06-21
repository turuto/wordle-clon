export class GameManager {
    constructor(board, keyboard) {
        this.board = board;
        this.keyboard = keyboard;
        this.hiddenWord = undefined;
        this.currentRound = undefined;
        this.totalRounds = undefined;
        this.cursor = undefined;
        this.currentAttempt = [];
    }

    startGame(word) {
        this.resetGame(word);
        this.startRound();
    }

    resetGame(word) {
        console.log('resetting');
        this.hiddenWord = word;
        this.currentRound = 0;
        this.totalRounds = this.board.numRounds - 1;
        this.keyboard.el.addEventListener('attemptFinished', this.submitRound.bind(this));
        this.keyboard.el.addEventListener('deleteLetter', this.deleteLetter.bind(this));
        this.keyboard.el.addEventListener('addLetter', e => {
            this.addLetter(e.detail)
        });
        this.keyboard.toggleKeyboard(true);
    }

    startRound() {
        console.log(`Starting Round ${this.currentRound} out of ${this.totalRounds}`);
        this.currentAttempt = [];
        this.cursor = 0;
        this.board.clearActiveRow();
        this.board.setActiveRow(this.currentRound);
        this.board.setActiveCell(this.cursor);
    }

    addLetter(letter) {
        if (this.cursor < this.hiddenWord.length) {
            this.currentAttempt.push(letter);
            this.board.writeLetter(this.cursor, letter, 'active');
            this.cursor++
            if (this.cursor < this.hiddenWord.length) {
                this.board.setActiveCell(this.cursor);
            }
        }
    }

    deleteLetter() {
        if (this.currentAttempt.length > 0) {
            this.currentAttempt.pop();
            this.cursor--
            this.board.paintLetter(this.cursor, '');
            if (this.cursor >= 0) {
                this.board.setActiveCell(this.cursor);
            }
        }
    }

    checkWord() {
        // TODO CHECK FIRST IF WORD EXISTS
        const hiddenArr = this.hiddenWord.split('');
        // 1st round: get the ones in the right place
        let letterStatus = this.currentAttempt.map((letter, index) => {
            // this gives us the ones in the right spot
            return this.hiddenWord.charAt(index) === letter ? 'success' : undefined;
        });

        const remainingToGuess = hiddenArr.filter((letter, index) => !letterStatus[index]);

        letterStatus.forEach((item, index) => {
            if (typeof item === 'undefined') {
                const searchedLetter = this.currentAttempt[index];
                if (remainingToGuess.includes(searchedLetter)) {
                    letterStatus[index] = 'notInPlace';
                } else {
                    letterStatus[index] = 'wrong';
                }
            }
            this.board.colorLetter(index, letterStatus[index]);
        })
    }

    checkLetter(letter, word) {
        const wordLetters = word.split('');
        console.log(`checking ${letter} in ${wordLetters}`);

        return 'success';
    }

    submitRound() {
        // only check when in the last letter
        if (this.cursor === this.hiddenWord.length) {
            this.checkWord();
            this.gotoNextRound();
        }
    }

    gotoNextRound() {
        if (this.currentRound === this.totalRounds) {
            this.gameOver();
        } else {
            this.currentRound++;
            this.startRound()
        }
    }

    gameOver() {
        console.log('gameOver');
    }
}