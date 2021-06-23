let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let widthCanva = 16;
let heightCanva = 16;
let tempo = 110;
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 0 * box,
    y: 0 * box
}



let direction = "right";
let food ={
    x: Math.floor(Math.random() * (widthCanva-1) + 1) * box,
    y: Math.floor(Math.random() * (heightCanva-1) + 1) * box
    
}


var img = new Image();
img.src = 'img/fundo.jpg';
function criarBG() {
  var pattern = context.createPattern(img, 'repeat');
  context.fillStyle = pattern;
  context.fillRect(0, 0, widthCanva*box, heightCanva*box);
};

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}



function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);



function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}



function iniciarJogo(){    

    if(snake[0].x > (widthCanva-1)*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = widthCanva * box;
    if(snake[0].y > (heightCanva-1)*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = heightCanva * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * (widthCanva-1) +1) * box;
        food.y = Math.floor(Math.random() * (heightCanva-1) +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, tempo);