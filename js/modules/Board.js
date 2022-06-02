export class Board {
    constructor(el, numLetters, numRounds) {
        this.el = el;
        this.numLetters = numLetters;
        this.numRounds = numRounds;
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
    }

    buildRow() {
        let rowHTML = '';
        for (let i = 0; i < this.numLetters; i++) {
            rowHTML += '<div class="board__letter"></div>'
        }

        return rowHTML;
    }
}