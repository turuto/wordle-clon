export class Board {
    constructor(el, numLetters, numRounds) {
        this.el = el;
        this.numLetters = numLetters;
        this.numRounds = numRounds;
        this.rows = undefined;
        this.activeRow = undefined;
        this.currentCells = null;
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
            rowHTML += '<div class="board__cell"></div>'
        }
        return rowHTML;
    }

    clearActiveRow() {
        const activeRow = this.el.querySelector('.board__row--active');

        if (activeRow) {
            activeRow.classList.remove('board__row--active');
            this.currentCells = null;
        }
    }

    setActiveRow(index) {
        this.activeRow = this.rows[index]
        this.currentCells = this.activeRow.querySelectorAll('.board__cell');
        this.activeRow.classList.add('board__row--active');
    }

    clearActiveCell() {
        const activeLetter = this.el.querySelector('.board__cell--active');

        if (activeLetter) {
            activeLetter.classList.remove('board__cell--active');
        }
    }

    setActiveCell(index) {
        this.clearActiveCell();
        this.currentCells[index].classList.add('board__cell--active');
    }

    writeLetter(index, value, state) {
        const cell = this.currentCells[index];
        cell.innerHTML = value.toUpperCase();
        if (state) {
            this.colorLetter(index, state);
        }
    }

    colorLetter(index, state) {
        const cell = this.currentCells[index];
        cell.classList.add(`board__cell--${state}`);
    }
}