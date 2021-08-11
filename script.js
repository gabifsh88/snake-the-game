let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
   // context.fillStyle = "lightgreen"; 
    var img = new Image();
    img.src = 'img/bg.png';
    img.onload = function() {
        var pattern = context.createPattern(img, 'repeat');
        context.fillStyle = pattern;
       // context.fillRect(0, 0, 300, 300);
    };
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){ 
    // for(i = 0; i < snake.length; i++){
        var img = new Image();
        var imgCabeca = new Image ();
        img.src = 'img/cobra2.png';
        imgCabeca.src = 'img/cabeca.png';
        imgCabeca.onload = function (){
            context.drawImage(imgCabeca, snake[0].x, snake[0].y, box, box);
        };
        img.onload = function() {
            for(i = 1; i < snake.length; i++){
                    context.drawImage(img, snake[i].x, snake[i].y, box, box);
            }
        };
        //context.fillStyle = "black";
        //context.fillRect(snake[i].x, snake[i].y, box, box);
    //}
}

function drawFood (){
    //context.fillStyle = "red";
    var img = new Image();
    img.src = 'img/rato2.png';
    img.onload = function() {
        context.drawImage(img, food.x, food.y, box, box);
    };
    //context.fillRect(food.x, food.y, box, box);
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

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(' + "\r\n Sua pontuação foi " + pontuacao) ;
            pontuacao = 0;
            setPlacar(pontuacao);
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
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        pontuacao = pontuacao + valorRato;
        setPlacar(pontuacao);
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

var elemento = document.getElementById("velocidade");
let jogo = setInterval(iniciarJogo, 700 - elemento.value);
var valorRato = ((elemento.value) / 100);
var pontuacao = 0;
elemento.onchange = function(){
    valorRato = ((this.value)/100);
    alert("Novo nível acionado");
    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, 700 - elemento.value);
};

function setPlacar(pontos){
    var placar = document.getElementById("placar"); 
    placar.innerHTML = pontos;
}



