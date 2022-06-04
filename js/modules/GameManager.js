export class GameManager {
    constructor(board, keyboard) {
        this.board = board;
        this.keyboard = keyboard;
        this.hiddenWord = undefined;
    }

    startGame(word) {
        this.hiddenWord = word;
        this.resetGame();
    }

    resetGame() {
        console.log(this);
    }
}