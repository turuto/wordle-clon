import { words } from './dictionary.js';
import { Keyboard } from './Keyboard.js'
import { Board } from './Board.js'
import { NUMLETTERS, ROUNDS } from './constants.js';
import { GameManager } from './GameManager.js';

export class Game {
    constructor() {
        this.setElements();
        this.init()
    }

    init() {
        this.fetchWords(NUMLETTERS);
    }

    setElements() {
        const boardEl = document.querySelector('.board');
        this.board = new Board(boardEl, NUMLETTERS, ROUNDS);

        const keyBoardEl = document.querySelector('.keyboard');
        this.keyboard = new Keyboard(keyBoardEl, false);

        this.manager = new GameManager(this.board, this.keyboard);
    }

    fetchWords(numLetters) {
        const filteredWords = words[`${numLetters}`];
        console.log(filteredWords);
    }

};
