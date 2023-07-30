import { words } from './dictionary.js';
import { Keyboard } from './Keyboard.js'
import { Board } from './Board.js'
import { NUMLETTERS, ROUNDS } from './constants.js';
import { GameManager } from './GameManager.js';

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
                this.filterList(data);
                const chosenWord = this.chooseWord();
                this.manager.dictionary = this.words;
                this.manager.startGame(chosenWord);
                console.log('secret word is', chosenWord);
            });
    }

    filterList(rawList) {
        const tempWords = [...rawList.split(/\r?\n/)]; // array from line breaks
        // remove Diacritics
        const normalizedWords = tempWords.map(word =>
            word.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        );

        this.words = [... new Set(normalizedWords)]; // get unique values
    }

    chooseWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
};
