import './constants.js';
import { words } from './dictionary.js';
import { KEYBOARD_CONFIG, NUMLETTERS, ROUNDS } from './constants.js';

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
        this.keyBoardEl = document.querySelector('.keyboard');
        this.buildGrid(ROUNDS);
        this.buildKeyboard();
    }

    buildGrid(numRows) {
        console.log('BUILDING  A GRID OF', numRows);
    }

    buildKeyboard() {
        console.log('BUILDING  A keyBoard', KEYBOARD_CONFIG);
    }

    fetchWords(numLetters) {
        const filteredWords = words[`${numLetters}`];
        console.log(filteredWords);
    }
};
