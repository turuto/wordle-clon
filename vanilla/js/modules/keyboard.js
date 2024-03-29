import { KEYBOARD_CONFIG } from './constants.js';

export class Keyboard {
    constructor(el, enabled) {
        this.el = el;
        this.enabled = enabled;
        this.alphabet = KEYBOARD_CONFIG.flat().filter(a => a.length === 1);
        this.init();
    }

    init() {
        this.buildKeyboard();
        this.addListeners();
        //console.log(this);
    }

    buildKeyboard() {
        const keyboardHTML = KEYBOARD_CONFIG.map(row => {
            const buildKeyboardRow = (row) => {
                return row.map(letter => {
                    let label = letter;
                    let className;
                    if (label.toUpperCase() === 'BACKSPACE') {
                        label = 'DELETE';
                        className = 'keyboard__key--long';
                    } else if (label.toUpperCase() === 'ENTER') {
                        label = 'SEND';
                        className = 'keyboard__key--long';
                    }
                    return `<button class="keyboard__key ${className}" data-key="${letter}">${label}</button>`
                }).join('');;
            }
            return `<div class="keyboard__row">${buildKeyboardRow(row)}</div>`;
        }).join('');

        this.el.innerHTML = keyboardHTML;
    }

    addListeners() {
        this.el.addEventListener('click', (e) => {
            let key = e.target.dataset.key;
            if (key) {
                this.handleKey(key);
            }
        });

        document.addEventListener('keydown', e => {
            e.preventDefault();
            const key = e.key;
            this.handleKey(key);
        });

    }

    handleKey(key) {
        if (this.enabled) {
            if (key.toUpperCase() === 'ENTER') {
                // console.log('ENTER PRESSED')
                const sendAttemptEvent = new CustomEvent('attemptFinished');
                this.el.dispatchEvent(sendAttemptEvent);
            } else if (key.toUpperCase() === 'BACKSPACE') {
                // console.log('BACKSPACE PRESSED')
                const deleteEvent = new CustomEvent('deleteLetter');
                this.el.dispatchEvent(deleteEvent);
            } else if (this.alphabet.includes(key)) {
                // console.log('letter pressed ', key)
                const addLetterEvent = new CustomEvent('addLetter', { detail: key });
                this.el.dispatchEvent(addLetterEvent);
            } else {
                return;
            }
        }
    }

    toggleKeyboard(state) {
        console.log('keyboard status', state);
        this.enabled = state;
        if (state) {
            this.el.classList.remove('disabled');
        } else {
            this.el.classList.add('disabled');
        }
    }

    colorKey(letter, state) {
        // the change of the color hint in the keyboard is graduated
        // this is, we only change it if the new color means an improvemment in the guess
        const successGradation = ['wrong', 'notInPlace', 'success'];
        const keyEl = this.el.querySelector(`[data-key=${letter}]`);

        const prevClass = [...keyEl.classList]
            .filter(item => item.includes('--'))
            .join('');
        const prevState = prevClass.substring(prevClass.indexOf('--') + 2);

        const hasImproved = successGradation.indexOf(prevState) < successGradation.indexOf(state);

        if (hasImproved) {
            keyEl.classList.remove(`keyboard__key--${prevState}`);
            keyEl.classList.add(`keyboard__key--${state}`);
        }
    }
}