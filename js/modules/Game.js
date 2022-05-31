import { words } from './dictionary.js';
import { Keyboard } from './keyboard.js'
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
        this.buildGrid(ROUNDS);

        this.keyBoardEl = document.querySelector('.keyboard');
        this.keyboard = new Keyboard(this.keyBoardEl);
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

    fetchWords(numLetters) {
        const filteredWords = words[`${numLetters}`];
        console.log(filteredWords);
    }
};
