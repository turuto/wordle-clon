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
        const endpoint = './js/data/words.txt';
        fetch(endpoint)
            .then(response => response.text())
            .then(data => {
                this.words = [...data.split(/\r?\n/)];
                const chosenWord = this.words[Math.floor(Math.random() * this.words.length)];
                console.log(chosenWord);
                this.manager.startGame(chosenWord);
            });

        // const filteredWords = words[`${numLetters}`];
        // const chosenWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
        // //console.log(filteredWords);
        // this.manager.startGame(chosenWord);
    }

};
