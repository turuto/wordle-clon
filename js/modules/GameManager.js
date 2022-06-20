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
        this.keyboard.el.addEventListener('attemptFinished', this.checkWord.bind(this));
        this.keyboard.el.addEventListener('deleteLetter', this.deleteLetter.bind(this));
        this.keyboard.el.addEventListener('addLetter', e => {
            this.addLetter(e.detail)
        });
        this.keyboard.toggleKeyboard(true);
    }

    startRound() {
        console.log(`Starting Round ${this.currentRound} out of ${this.totalRounds}`);
        this.cursor = 0;
        this.board.clearActiveRow();
        this.board.setActiveRow(this.currentRound);
        this.board.setActiveCell(this.cursor);
    }

    addLetter(letter) {
        if (this.cursor < this.hiddenWord.length) {
            this.currentAttempt.push(letter);
            this.board.paintLetter(this.cursor, letter, 'active');
            this.cursor++
            if (this.cursor < this.hiddenWord.length) {
                this.board.setActiveCell(this.cursor);
            }
        }
    }

    deleteLetter() {
        this.currentAttempt.pop();
        this.cursor--
        this.board.paintLetter(this.cursor, '');
        if (this.cursor >= 0) {
            this.board.setActiveCell(this.cursor);
        }
    }

    checkLetter(letter, word) {
        const wordLetters = word.split('');
        console.log(`checking ${letter} in ${wordLetters}`);

        return 'success';
    }

    checkWord() {
        console.log('CHECKING WORD');
        // TODO: iterar por el intento  y checkear las letras
        // const letterStatus = this.checkLetter(letter, this.hiddenWord);
        this.gotoNextRound();
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