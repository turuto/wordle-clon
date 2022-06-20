export class Board {
    constructor(el, numLetters, numRounds) {
        this.el = el;
        this.numLetters = numLetters;
        this.numRounds = numRounds;
        this.rows = undefined;
        this.activeRow = undefined;
        this.currentLetters = null;
        this.init();
    }

    init() {
        this.buildGrid();
    }

    buildGrid() {
        const gridHTML = Array(this.numRounds).fill(null).map(() => {
            return `<div class="board__row">${this.buildRow()}</div>`;
        }).join('');

        this.el.innerHTML = gridHTML;
        this.rows = this.el.querySelectorAll('.board__row');
    }

    buildRow() {
        let rowHTML = '';
        for (let i = 0; i < this.numLetters; i++) {
            rowHTML += '<div class="board__letter"></div>'
        }
        return rowHTML;
    }

    clearActiveRow() {
        const activeRow = this.el.querySelector('.board__row--active');

        if (activeRow) {
            activeRow.classList.remove('board__row--active');
            this.currentLetters = null;
        }
    }

    setActiveRow(index) {
        this.activeRow = this.rows[index]
        this.currentLetters = this.activeRow.querySelectorAll('.board__letter');
        this.activeRow.classList.add('board__row--active');
    }

    setActiveLetter(index) {
        const activeLetter = this.el.querySelector('.board__letter--active');
        debugger;
        if (activeLetter) {
            activeLetter.classList.remove('board__letter--active');
        }
        this.currentLetters[index].classList.add('board__letter--active');
    }

    paintLetter(index, value, state) {
        const cell = this.currentLetters[index];
        cell.innerHTML = value.toUpperCase();
        if (state) {
            cell.classList.add(`board__letter--${state}`);
        }
    }
}