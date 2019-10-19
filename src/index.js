//import Paddle from './src/paddle';
//要畫canvas 要先抓到canvas
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

ctx.clearRect(0,0,800,600);
//畫之前要先清乾淨

class InputHandler{
    constructor(paddle){
        document.addEventListener("keydown",event=>{
            switch(event.keyCode){
                case 37:
                    paddle.moveLeft();
                    break;
                case 39:
                    paddle.moveRight();
                    break;
            }
        });
        document.addEventListener("keyup",event=>{
            switch(event.keyCode){
                case 37:
                    if(paddle.speed<0)paddle.stop();
                    break;
                case 39:
                    if(paddle.speed>0)paddle.stop();
                    break;
            }
        });
    }
}



ctx.fillStyle = '#f00';
//預定為紅色，下面就都是紅色
ctx.fillRect(20,20,100,100);
//在(20,20)的位置放一個長寬100的Rect

ctx.fillStyle = '#00f';
ctx.fillRect(270,200,50,50);



class Paddle {
    constructor(gameWidth,gameHeight){
        this.width = 150;
        this.height= 20;

        this.maxSpeed = 10;
        this.speed = 0;

        this.position={
            x:gameWidth / 2 - this.width / 2,
            y:gameHeight - this.height - 10
        };
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }
    moveRight(){
        this.speed = +this.maxSpeed;
    }
    stop(){
        this.speed = 0;
    }

    draw(ctx){
        ctx.fillStyle = '#0ff';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }   
    update(deltaTime){
        if(!deltaTime) return;
        this.position.x += this.speed;
        if(this.position.x < 0) this.position.x = 0;

        if(this.position.x + this.width > GAME_WIDTH)
            this.position.x = GAME_WIDTH - this.width;
    }
}

let paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT);

new InputHandler(paddle);

paddle.draw(ctx);

let lastTime = 0;
function gameLoop(timeStamp){
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0,0,800,600);
    paddle.update(deltaTime);
    paddle.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
