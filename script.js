const valueEmpty = 1;
const valueX = 2;
const valueO = 3;
const defaultCols = 10;
const defaultRows = 10;
const defaultCellSize = 40;

function cellXO(x, y) {
    this.x = x;
    this.y = y;
    this.value = valueEmpty;
    this.getHtml = function () {
        let top = this.x * defaultCellSize;
        let left = this.y * defaultCellSize;
        let cellHtml = '<div id="cell-' + x + '-' + y + '" ' +
            'class="cell" ' +
            'onclick="play(' + x + ',' + y + ')" ' +
            'style="position: absolute; width: ' + defaultCellSize + 'px;' +
            'height: ' + defaultCellSize + 'px;' +
            ' left: ' + left + 'px;' +
            'top: ' + top + 'px;' +
            'line-height:' + defaultCellSize + 'px;"></div>';
        return cellHtml;
    };
    this.draw = function () {
        let cellDiv = document.getElementById("cell-" + this.x + "-" + this.y);
        switch (this.value) {
            case valueX:
                cellDiv.innerHTML = "X";
                break;
            case valueO:
                cellDiv.innerHTML = "O";
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}

function gameBoard(rows, cols, elementId) {
    this.rows = rows;
    this.cols = cols;
    this.elementId = elementId;
    this.turn = valueO;
    this.cells = [];
    this.isOver = false;
    this.draw = function () {
        let gameBoardiv = document.getElementById(this.elementId);
        gameBoardiv.innerHTML = "";
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            this.cells.push(row);
            for (let j = 0; j < this.cols; j++) {
                let Cell = new cellXO(i, j);
                row.push(Cell);
                gameBoardiv.innerHTML += Cell.getHtml();
            }
        }
    };
    this.play = function (x, y) {
        if (this.isOver) {
            return;
        }
        let Cell = this.cells[x][y];
        if (Cell.value === valueEmpty) {
            Cell.value = this.turn;
            Cell.draw();
            this.isWin(x, y, Cell.value);
            if (this.turn === valueO) {
                this.turn = valueX;
            } else {
                this.turn = valueO;
            }
        } else {
            alert("Cell is not empty");
        }
    };
    this.isWin = function (x, y, str) {
        if (this.checkNgang(x, y, str) || this.checkDoc(x, y, str) || this.checkChinh(x, y, str) || this.checkPhu(x, y, str)) {
            this.isOver = true;
            alert("You Won!")
        }
    };
    this.checkNgang = function (x, y, str) {
        let count = 0;
        for (let k = -5; k <= 5; k++) {
            if (y + k > 0 && y + k < this.cols) {
                if (this.cells[x][y + k].value === str) {
                    count++;
                } else if (count < 5) {
                    count = 0;
                }
            }
        }
        if (count === 5) {
            return true;
        } else {
            count = 0;
            return false;
        }
    };
    this.checkDoc = function (x, y, str) {
        let count = 0;
        for (let k = -5; k <= 5; k++) {
            if (x + k > 0 && x + k < this.rows) {
                if (this.cells[x+k][y].value === str) {
                    count++;
                } else if (count < 5) {
                    count = 0;
                }
            }
        }
        if (count === 5) {
            return true;
        } else {
            count = 0;
            return false;
        }
    };
    this.checkChinh = function (x, y, str) {
        let count = 0;
        for (let k = -5; k <= 5; k++) {
            if (y + k >= 0 && y + k < this.cols && x + k >= 0 && x + k < this.rows) {
                if (this.cells[x+k][y + k].value === str) {
                    count++;
                } else if (count < 5) {
                    count = 0;
                }
            }
        }
        if (count === 5) {
            return true;
        } else {
            count = 0;
            return false;
        }
    };
    this.checkPhu = function (x, y, str) {
        let count = 0;
        for (let k = -5, j = 5; k <= 5, j >= -5; k++, j--) {
            if (y + k >= 0 && y + k < this.cols && x + j >= 0 && x + j < this.rows) {
                if (this.cells[x+j][y + k].value === str) {
                    count++;
                } else if (count < 5) {
                    count = 0;
                }
            }
        }
        if (count === 5) {
            return true;
        } else {
            count = 0;
            return false;
        }
    };

}

function play(x, y) {
    gameBoard1.play(x, y);
}

function start() {
    gameBoard1 = new gameBoard(defaultRows, defaultCols, "game-board");
    gameBoard1.draw();
}

let gameBoard1;
start();


