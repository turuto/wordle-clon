import { KEYBOARD_CONFIG } from './constants.js';

export class Keyboard {
    constructor(el) {
        this.el = el;
        this.init();
    }

    init() {
        this.buildKeyboard();
        this.addListeners();
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

        this.el.innerHTML = keyboardHTML;
    }

    addListeners() {
        this.el.addEventListener('click', (e) => {
            const key = e.target.dataset.key;
            console.log(key);
        });
    }
}