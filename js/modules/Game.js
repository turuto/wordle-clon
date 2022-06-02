import { words } from './dictionary.js';
import { Keyboard } from './Keyboard.js'
import { Board } from './Board.js'
import { NUMLETTERS, ROUNDS } from './constants.js';

export class Game {
    constructor() {
        this.init()
        this.setElements();
    }

    init() {
        this.fetchWords(NUMLETTERS);
    }

    setElements() {
        this.boardEl = document.querySelector('.board');
        this.board = new Board(this.boardEl, NUMLETTERS, ROUNDS);

        this.keyBoardEl = document.querySelector('.keyboard');
        this.keyboard = new Keyboard(this.keyBoardEl);
    }



    fetchWords(numLetters) {
        const filteredWords = words[`${numLetters}`];
        console.log(filteredWords);
    }
};
