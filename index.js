class Model {
    constructor(size) {
        this.gameScore = 0;
        this
        this.gameArr = [];
        this.gameSize = size;
        this._initializeGame();
    }

    _initializeGame() {
        for(let i = 0; i < this.gameSize; ++i) {
            let arr = [];
            for(let j = 0; j < this.gameSize; ++j) {
                arr.push(0);
            }
            this.gameArr.push(arr);
            console.log(arr);
        }
        console.log(this.gameArr);
        this.getRandomPosition();
    }

    bindValueChange(callback) {
        this.onMove = callback;
    }

    getRandomPosition() {
        let zeroPositions = new Array();

        for(let i = 0; i < this.gameSize; ++i) {
            for(let j = 0; j < this.gameSize; ++j) {
                if(this.gameArr[i][j] === 0) {
                    zeroPositions.push(i * this.gameSize + j);
                }
            }
        }

        if(zeroPositions.length === 0) {
            // alert("Game Over!!! No Positions Left");

            let ok = 0;

            for(let i = 0; i < this.gameSize; ++i) {
                for(let j = 0; j < this.gameSize - 1; ++j) {
                    if(this.gameArr[i][j] === this.gameArr[i][j + 1]) {
                        ok = 1;
                    }
                }
            }

            for(let j = 0; j < this.gameSize; ++j) {
                for(let i = 0; i < this.gameSize - 1; ++i) {
                    if(this.gameArr[i][j] === this.gameArr[i + 1][j]) {
                        ok = 1;
                    }
                }
            }

            if(!ok) {
                alert("Game Over!!! No Positions Left");
            }
        }
        else {
            let guess = Math.floor(Math.random() * zeroPositions.length);
            let x = Math.floor(zeroPositions[guess] / this.gameSize);
            let y = Math.floor(zeroPositions[guess] % this.gameSize);

            this.gameArr[x][y] = 2;
        }
    }

    upMove() {
        for(let j = 0; j < this.gameSize; ++j) {
            let cnt = 0;
            for(let i = 0; i < this.gameSize; ++i) {
                if(this.gameArr[i][j] != 0) {
                    this.gameArr[cnt++][j] = this.gameArr[i][j];
                }
            }
            for(let i = cnt; i < this.gameSize; ++i) {
                this.gameArr[i][j] = 0;
            }
            cnt = 0;
            for(let i = 0; i < this.gameSize; ++i) {
                if(i + 1 < this.gameSize && this.gameArr[i][j] === this.gameArr[i + 1][j]) {
                    this.gameScore += this.gameArr[i][j] + this.gameArr[i + 1][j];
                    this.gameArr[cnt++][j] = this.gameArr[i][j] + this.gameArr[i + 1][j];
                    i++;
                }
                else {
                    this.gameArr[cnt++][j] = this.gameArr[i][j];
                }
            }
            for(let i = cnt; i < this.gameSize; ++i) {
                this.gameArr[i][j] = 0;
            }
        }
        this._commit();
    }

    downMove() {
        for(let j = 0; j < this.gameSize; ++j) {
            let cnt = this.gameSize - 1;
            for(let i = this.gameSize - 1; i >= 0; --i) {
                if(this.gameArr[i][j] != 0) {
                    this.gameArr[cnt--][j] = this.gameArr[i][j];
                }
            }
            for(let i = cnt; i >= 0; --i) {
                this.gameArr[i][j] = 0;
            }
            cnt = this.gameSize - 1;
            for(let i = this.gameSize - 1; i >= 0; --i) {
                if(i - 1 >= 0 && this.gameArr[i][j] === this.gameArr[i - 1][j]) {
                    this.gameScore += this.gameArr[i][j] + this.gameArr[i - 1][j];
                    this.gameArr[cnt--][j] = this.gameArr[i][j] + this.gameArr[i - 1][j];
                    i--;
                }
                else {
                    this.gameArr[cnt--][j] = this.gameArr[i][j];
                }
            }
            for(let i = cnt; i >= 0; --i) {
                this.gameArr[i][j] = 0;
            }
        }
        this._commit();
    }
    leftMove() {
        for (let i = 0; i < this.gameSize; i++) {
            let cnt = 0;
            for (let j = 0; j < this.gameSize; j++) {
                if (this.gameArr[i][j] !== 0)
                    this.gameArr[i][cnt++] = this.gameArr[i][j];
            }
            for (let j = cnt; j < this.gameSize; j++) {
                this.gameArr[i][j] = 0;
            }
            cnt = 0;
            for (let j = 0; j < this.gameSize; j++) {
                if (
                    j + 1 < this.gameSize &&
                    this.gameArr[i][j] === this.gameArr[i][j + 1]
                ) {
                    this.gameScore += this.gameArr[i][j] + this.gameArr[i][j + 1];
                    this.gameArr[i][cnt++] =
                        this.gameArr[i][j] + this.gameArr[i][j + 1];
                    j++;
                } else {
                    this.gameArr[i][cnt++] = this.gameArr[i][j];
                }
            }
            for (let j = cnt; j < this.gameSize; j++) {
                this.gameArr[i][j] = 0;
            }
        }
        this._commit();
    }

    rightMove() {
        for (let i = 0; i < this.gameSize; i++) {
            let cnt = this.gameSize - 1;
            for (let j = this.gameSize - 1; j >= 0; j--) {
                if (this.gameArr[i][j] !== 0)
                    this.gameArr[i][cnt--] = this.gameArr[i][j];
            }
            for (let j = cnt; j >= 0; j--) {
                this.gameArr[i][j] = 0;
            }
            cnt = this.gameSize - 1;
            for (let j = this.gameSize - 1; j >= 0; j--) {
                if (
                    j - 1 >= 0 &&
                    this.gameArr[i][j] === this.gameArr[i][j - 1]
                ) {
                    this.gameScore += this.gameArr[i][j] + this.gameArr[i][j - 1];
                    this.gameArr[i][cnt--] =
                        this.gameArr[i][j] + this.gameArr[i][j - 1];
                    j--;
                } else {
                    this.gameArr[i][cnt--] = this.gameArr[i][j];
                }
            }
            for (let j = cnt; j >= 0; j--) {
                this.gameArr[i][j] = 0;
            }
        }
        this._commit();
    }

    _commit() {
        this.getRandomPosition();
        this.onMove(this.gameArr , this.gameScore);
    }
}

class View {
    constructor(size) {
        this.gameSize = size;
        this.gameTitle = this.createElement("div" , "game-title");
        this.gameScore = this.createElement("div", "game-score");
        this.gameSquares = this.createElement("div" , "game-squares");
        this.gameArea = this.createElement("div", "game-area");
        this.gameSetting = this.createElement("div" , "game-setting");
        this.gameSetting.append(this.gameTitle , this.gameScore);
        this.gameArea.append(this.gameSquares , this.gameSetting);
        this.gameWrapper = this.getElement(".game-wrapper");
        this.gameWrapper.append(this.gameArea);
    }

    displaySquares(gameValue , gameScore) {
        this.gameSquares.innerHTML = "";
        this.gameScore.innerHTML = `<h3>SCORE : ${gameScore || 0}</h3>`;
        this.gameTitle.innerHTML = `<h1>2048 ADVANCE</h1>`;
        for (let i = 0; i < this.gameSize; i++) {
            let row = this.createElement("div" , "game-square-row");
            for(let j = 0; j < this.gameSize; ++j) {
                let col = this.createElement("div", "game-square-col");
                col.innerHTML = `<p>${(gameValue && gameValue[i][j]) || ""}</p>`;
                row.append(col);
            }
            this.gameSquares.append(row);
        }
    }


    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    bindArrowMove(moves) {
        document.addEventListener("keyup" , (event) => {
            // event.preventDefault();
            if(event.key === "ArrowUp") {
                moves.upMove();
            }
            else if(event.key === "ArrowDown") {
                moves.downMove();
            }
            else if(event.key === "ArrowLeft") {
                moves.leftMove();
            }
            else if(event.key === "ArrowRight") {
                moves.rightMove();
            }
        });
    }
}

class Controller {
    constructor(model , view) {
        this.model = model;
        this.view = view;

        this.onMove(this.model.gameArr , this.model.gameScore);
        this.view.bindArrowMove(this.handleArrowMove);
        this.model.bindValueChange(this.onMove);
    }

    onMove = (gameArr , gameScore) => {
        this.view.displaySquares(gameArr , gameScore);
    };

    handleArrowMove = {
        upMove : () => {
            this.model.upMove();
        } , 
        downMove : () => {
            this.model.downMove();
        } , 
        leftMove : () => {
            this.model.leftMove();
        } ,
        rightMove : () => {
            this.model.rightMove();
        },
    };
}

var size = 4;
var app = new Controller(new Model(size) , new View(size));