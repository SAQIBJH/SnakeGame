let canavs = document.querySelector("canvas")
let ctx = canavs.getContext("2d");


class SnakeGame {
    constructor(ctx, width, height, noOfRows, noOfCol) {
        this.init_length = 5;
        this.direction = "down";
        this.cells = [];
        this.ctx = ctx;
        this.noOfRows = noOfRows;
        this.noOfCol = noOfCol;
        this.width = width;
        this.height = height;
        this.rowSize = height / noOfRows;
        this.colSize = width / noOfCol;
        this.foodAvailable = undefined;
        this.intervalId = undefined;
        this.count = 0;

    }


    createSnake() {
        for (let i = 0; i < this.init_length; i++) {
            this.cells.push({
                x: i,
                y: 0
            })

        }
    }



    drawSnake() {
        for (let cell of this.cells) {
            this.ctx.fillStyle = "white";
            if (cell === this.cells[this.cells.length - 1]) {
                this.ctx.fillStyle = "yellow";
            }
            this.ctx.strokeRect(cell.x * this.colSize, cell.y * this.rowSize, this.colSize, this.rowSize)
            this.ctx.fillRect(cell.x * this.colSize, cell.y * this.rowSize, this.colSize, (this.rowSize))
        
        this.ctx.font="30px serif"
        this.ctx.fillStyle="yellow";
        this.ctx.fillText(`Score: ${this.count}`,10,20)
        }
    }



    updateSnake() {
        const head = Object.assign({}, this.cells[this.cells.length - 1]);
        if (this.foodAvailable && this.foodAvailable.x === head.x && this.foodAvailable.y === head.y) {
            this.foodAvailable = undefined;
            this.count++;
          
        }
        else {
            this.cells.shift();
        }

        for(let i = 0; i<this.cells.length-1; i++){
            const cell = this.cells[i];
            console.log(cell);
            if(head.x===cell.x && head.y===cell.y){
                console.log(head.x," ",head.y)
            
                this.gameOver();
                return;
            }
            
        }

        switch (this.direction) {

            case "right":
                head.x += 1;
                break;

            case "left":
                head.x -= 1
                break;

            case "up":
                head.y -= 1;
                break;

            case "down":
                head.y += 1;
                break;
        }
        this.cells.push(head);
        this.ctx.clearRect(0, 0, this.width, this.height);



        if (head.x >= this.noOfCol || head.y >= this.noOfRows || head.x == -1 || head.y === -1) {
            this.gameOver();
            return;  
           
        }

    }


    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }



    generateFood() {
        this.foodAvailable = {
            x: this.generateRandomNumber(0, this.noOfRows - 1),
            y: this.generateRandomNumber(0, this.noOfCol - 1)
        }
    }



    drawFood() {
        if (!this.foodAvailable) {
            this.generateFood();
        }
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.foodAvailable.x * this.rowSize, this.foodAvailable.y * this.colSize, this.colSize, this.rowSize)

    }



    start() {
        this.createSnake();
        this.drawSnake();
        this.intervalId = setInterval(() => {
            sGame.updateSnake();
            sGame.drawSnake();
            sGame.drawFood();
        }, 300);
    }


    stop() {
        clearInterval(this.intervalId)
    }


    gameOver() {
        clearInterval(this.intervalId);
        this.ctx.fillStyle="black";
        this.ctx.fillRect(200,250,300,100)
        this.ctx.font="50px serif";
        this.ctx.fillStyle="white"
        this.ctx.strokeRect(200,250,300,100);
        this.ctx.fillText("Game Over",230,315);
    }





}



const sGame = new SnakeGame(ctx, 600, 600, 20, 20);
sGame.start();

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            sGame.direction = "left";
            break;
        case "ArrowUp":
            sGame.direction = "up";
            break;
        case "ArrowRight":
            sGame.direction = "right";
            break;
        case "ArrowDown":
            sGame.direction = "down";
            break;
        case "Escape":
            sGame.stop();
            break;
        default:
            break;
    }
})

































