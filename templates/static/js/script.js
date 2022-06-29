//Variables
var canvasWidth = 600; //tamaño del fondo del juego
var canvasHeight = 400; //tamaño del fondo del juego
var player;
var playerYPosition = 200; //variable para la posición
var fallSpeed = 0; //variable para fallSpeed(velocidad de caida)
var interval = setInterval(updateCanvas, 20); //intervalo
var isJumping = false; //variable boleana para controlar el salto
var jumpSpeed = 0;
var block;
var score = 0;
var scoreLabel;

/*La primera pieza de código que escribiremos establecerá un lienzo para nuestro juego. 
Puede ajustar la altura y el ancho según sea necesario.*/

function startGame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 10); //jugador usando la función create player
    block = new createBlock();
    // Asigna a la variable la puntuación un valor de scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

//funcion de crear personaje (cuadrado) y cada de sus funciones, salto
//movimiento, detener, velocidad 
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;

    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //Funcion para que el cubo caiga y no este flotando
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer(); //llamado a funcion para que se detanga el jugador
        }
    }

    //funcion para que el jugador se detenga
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }

    //funcion para el salto el cuadrado
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}

function createBlock() {
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);

    this.x = canvasWidth;
    this.y = canvasHeight - height;

    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }

    //fucnion para que dar efecto de movimiento
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Aumenta la puntuación si el bloque llegó al borde
            score++;
        }
    }
}


//Esta funcion detiene el juego una vez que ocurra una colisión.
function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;

    var playerBottom = player.y + player.height;
    var blockTop = block.y;

    if (playerRight > blockLeft &&
        playerLeft < blockLeft &&
        playerBottom > blockTop) {

        gameCanvas.stop();
    }
}


//funcion para crear la caja del puntaje
function createScoreLabel(x, y) {
    this.score = 0;
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}


//función de lienzo de actualización para redibujar al jugador y hacerlo caer
function updateCanvas() {
    detectCollision(); //llama a la funcion para detectar las colisiones

    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    player.makeFall();
    player.draw();
    player.jump();

    block.draw();
    block.attackPlayer();

    // Actualiza el puntaje
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}