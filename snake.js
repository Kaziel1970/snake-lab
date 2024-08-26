




const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");

const gridSize = 20;
let snake; 
let direction; 
let food; 
let score;
let gameStarted;
let message;
let gameTimer;

for(let i=0; i < gridSize * gridSize; i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
}

// Functions
function drawSnake(){
    snake.forEach(segment => {
        const index = segment.y * gridSize + segment.x;
        gameBoard.children[index].classList.add("snake");
    })
}

function drawFood(){
    const index = food.y * gridSize + food.x;
    gameBoard.children[index].classList.add("food");
}

function clearBoard(){
    document.querySelectorAll('.cell').forEach(function(cell) {
        cell.classList.remove("snake", "food");
    })
}


function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    }

    

    // Did head of the snake just hit a wall?
    if(newHead.x < 0 || newHead.x > gridSize || newHead.y < 0 || newHead.y > gridSize) {
        msg = "You lost. Snake went out of bounds.";
        gameOver();
    }

    // Did the snake run into itself?
    if(snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)){
        msg = "You lost. Snake ran into iteself.";
        gameOver();
    }

    snake.unshift(newHead);

    if(newHead.x === food.x && newHead.y === food.y){
        score++;
        scoreDisplay.innerText = score;

        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        }
    } else {
        snake.pop();
    }

    clearBoard();
    drawSnake();
    drawFood();
}


// Start / run game
function startGame(){    
    gameStarted = true;
    gameTimer = setInterval(moveSnake, 800); 
}

function renderMessage(){
    messageDisplay.innerText = msg;
}

function resetScore(){
    score = 0;
}

function renderScore(){
    scoreDisplay.innerText = score;
}

function resetSnake(){
    snake = [{x:10, y:10}];
}

function resetFood(){
    food = {x: 5, y: 5};
}

function resetDirection(){
    direction = {x: 0, y: 0};
}

function setupGame(){
    gameStarted = false;
    clearInterval(gameTimer);
    msg = "Welcome to my Snake Game!";
    clearBoard();
    resetSnake();
    drawSnake();
    resetFood();
    drawFood();
    resetDirection();
    resetScore();
    renderScore();
    renderMessage();
}

function gameOver(){
    renderMessage();
    clearInterval(gameTimer);
    gameStarted = false;
}

setupGame();



// Event listeners 
document.addEventListener("keydown", (event) => {
    switch(event.key){
        case "ArrowUp":
            if(!gameStarted) startGame();
            if(direction.y === 0) direction = {x:0, y:-1};
            break;
        case "ArrowDown":
            if(!gameStarted) startGame();
            if(direction.y === 0) direction = {x:0, y: 1};
            break;
        case "ArrowLeft":
            if(!gameStarted) startGame();
            if(direction.x === 0) direction = {x:-1, y:0};
            break;
        case "ArrowRight":
            if(!gameStarted) startGame();
            if(direction.x === 0) direction = {x:1, y:0};
            break; 
    }}
)

document.querySelector("#resetButton").addEventListener("click", setupGame);















