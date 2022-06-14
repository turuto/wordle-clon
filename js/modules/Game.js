import { words } from './dictionary.js';
import { Keyboard } from './Keyboard.js'
import { Board } from './Board.js'
import { NUMLETTERS, ROUNDS } from './constants.js';
import { GameManager } from './GameManager.js';
// import PubSub from '../lib/pubsub';

export class Game {
    constructor() {
        this.init()
    }

    init() {
        this.setElements();
        this.keyboard.toggleKeyboard(false);
        this.fetchWords(NUMLETTERS);
        this.words = []
    }

    setElements() {
        const boardEl = document.querySelector('.board');
        this.board = new Board(boardEl, NUMLETTERS, ROUNDS);

        const keyBoardEl = document.querySelector('.keyboard');
        this.keyboard = new Keyboard(keyBoardEl, false);

        this.manager = new GameManager(this.board, this.keyboard);
    }

    fetchWords(numLetters) {
        let searchedLength = numLetters;

        if (numLetters < 10) {
            searchedLength = '0' + numLetters;
        }

        const endpoint = `./js/data/${searchedLength}.txt`;
        fetch(endpoint)
            .then(response => response.text())
            .then(data => {
                this.words = [...data.split(/\r?\n/)];
                const chosenWord = this.chooseWord();
                console.log('escogida', chosenWord);
                this.manager.startGame(chosenWord);
            });
    }

    chooseWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

};
