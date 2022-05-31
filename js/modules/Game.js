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
        this.addListeners();
    }

    buildGrid(numRows) {
        const gridHTML = Array(numRows).fill(null).map(() => {
            const buildRow = (lettersTotal) => {
                let rowHTML = '';
                for (let i = 0; i < lettersTotal; i++) {
                    rowHTML += '<div class="board__letter"></div>'
                }

                return rowHTML;
            };

            return `<div class="board__row">${buildRow(NUMLETTERS)}</div>`;
        }).join('');

        this.boardEl.innerHTML = gridHTML;
    }

    buildKeyboard() {
        const keyboardHTML = KEYBOARD_CONFIG.map(row => {
            const buildKeyboardRow = (row) => {
                return row.map(letter => {
                    return `<button class="keyboard__key" data-key="${letter}">${letter}</button>`
                }).join('');;
            }
            return `<div class="keyboard__row">${buildKeyboardRow(row)}</div>`;
        }).join('');

        this.keyBoardEl.innerHTML = keyboardHTML;
    }

    addListeners() {
        this.keyBoardEl.addEventListener('click', (e) => {
            const key = e.target.dataset.key;
            console.log(key);
        });
    }

    fetchWords(numLetters) {
        const filteredWords = words[`${numLetters}`];
        console.log(filteredWords);
    }
};
