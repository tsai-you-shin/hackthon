const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const SPACE_KEY = 32;

const GAME_WIDTH = 1100;
const GAME_HEIGHT = 500;

const PLAYER_WIDTH = 50;
const PLAYER_SPEED = 600.0;
const LASER_MAX_SPEED = 100.0;
const LASER_COOLDOWN = 0.5;

const DEBRIS_WIDTH=80;

const GAME_STATE = {
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  upPressed: false,
  downPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
  playerCooldown:0,
  lasers: [],
  debrises: [],
  gameOver: false,
  tmp:0
};

function rectsIntersect(r1, r2) { 
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

function playerInit($container) {
  GAME_STATE.playerX = GAME_WIDTH / 2;
  GAME_STATE.playerY = GAME_HEIGHT -30;
  const $player = document.createElement("img");
  $player.src = "img/lll.png";
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function playerDestroy($container, player) {
  $container.removeChild(player);
  GAME_STATE.gameOver = true;
}

function playerMove(dt, $container) {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= dt * PLAYER_SPEED;
  }
  else if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += dt * PLAYER_SPEED;
  }
  else if (GAME_STATE.upPressed) {
    GAME_STATE.playerY -= dt * PLAYER_SPEED;
  }
  else if (GAME_STATE.downPressed) {
    GAME_STATE.playerY += dt * PLAYER_SPEED;
  }

  GAME_STATE.playerY = clamp(
    GAME_STATE.playerY,
    PLAYER_WIDTH + 20,
    GAME_HEIGHT - 20);

  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH +10,
    GAME_WIDTH - PLAYER_WIDTH
  );
  

  if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
    laserInit($container, GAME_STATE.playerX, GAME_STATE.playerY);
    GAME_STATE.playerCooldown = LASER_COOLDOWN;
  }
  if (GAME_STATE.playerCooldown > 0) {
    GAME_STATE.playerCooldown -= dt;
  }

  const player = document.querySelector(".player");
  setPosition(player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function laserInit($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/l3.png";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.lasers.push(laser);
  setPosition($element, x, y);
}
function myalert(debris){
  if(debris.type == 0){
    Swal.fire('Aura','Well done','success');
  } else if (debris.type ==1){
    Swal.fire('Cloud Sat','Well done','success');
  } else if (debris.type ==2){
    Swal.fire('Europa','Well done','success');
  } else if (debris.type ==3){
    Swal.fire('Fuse','Well done','success');
  } else if (debris.type ==4){
    Swal.fire('Rocket','Well done','success');
  } else if (debris.type ==5){
    Swal.fire('Stone','Well done','success');
  } 
}
function laserMove(dt, $container) {
  const lasers = GAME_STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i]; 
    laser.y -= dt * LASER_MAX_SPEED;
    if (laser.y < 0) {
      laserDestroy($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const debrises = GAME_STATE.debrises;
    for (let j = 0; j < debrises.length; j++) {
      const debris = debrises[j];
      if (debris.isDead) continue;
      const r2 = debris.$element.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        myalert(debris);
        debrisDestroy($container, debris);
        laserDestroy($container, laser);
        break;
      }
      }
    }
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
}


function laserDestroy($container,laser){
  $container.removeChild(laser.$element);
  laser.isDead = true;
}

function debrisInit($container,x,y){
  const $element = document.createElement("img");
  var type;
  if(GAME_STATE.tmp==0){
    $element.src = "img/1.png"; //aura
    type =GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==1){
    $element.src = "img/2.png"; //cloud sat
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==2){
    $element.src = "img/3.png"; //europa
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==3){
    $element.src = "img/4.png"; //fuse
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==4){
    $element.src = "img/5.png"; //rocket
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==5){
    $element.src = "img/6.png"; 
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==6){
    $element.src = "img/7.png"; 
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==7){
    $element.src = "img/8.png"; 
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==8){
    $element.src = "img/9.png"; 
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==9){
    $element.src = "img/10.png";
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } else if(GAME_STATE.tmp==10){
    $element.src = "img/11.png";
    type = GAME_STATE.tmp;
    GAME_STATE.tmp++;
  } 

  $element.className = "debris";
  $container.appendChild($element);
  var dir = 1;
  const debris = {x,y,$element, type,dir}; 
  GAME_STATE.debrises.push(debris);
  setPosition($element,x,y);
}

function debrisMove(dt, $container){
  const tmp1 = 1;//Math.floor(Math.random()*2) * 2 -1;
  //var dx = tmp1;
  const debrises = GAME_STATE.debrises;
  for(let i = 0; i < debrises.length; i++){
    const debris = debrises[i];
    const x = debris.x ;//dx*debris.dir;
    const y = debris.y +Date.now()-GAME_STATE.lastTime;
    //if(x < 10 || x > GAME_WIDTH){
    //  debris.dir = -debris.dir;
    //}
    setPosition(debris.$element, x, y);
    const r1 = debris.$element.getBoundingClientRect();
    const player = document.querySelector(".player");
    alert(debris.$element);
    const r2 = player.getBoundingClientRect();
    if(rectsIntersect(r1,r2)) {
      playerDestroy($container,player);
      break;
    }
  }
  GAME_STATE.debrises = GAME_STATE.debrises.filter(e =>!e.isDead);

}

function debrisDestroy($container, debris) {
  $container.removeChild(debris.$element);
  debris.isDead = true;
}


function init() {
  const $container = document.querySelector(".game");
  playerInit($container);
  for(let i = 0; i < 11; i++){
    x = Math.floor(Math.random()*900);
    y = Math.floor(Math.random()*300);
    debrisInit($container,x,y);
  }

  
}

function playerHasWon() {
  return GAME_STATE.debrises.length == 0;
}

function update(e) {
  const currentTime = Date.now();
  //if (currentTime%1000 == 0)alert(GAME_STATE.debrises[0].x);
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;

  if (GAME_STATE.gameOver) {
    document.querySelector(".loss").style.display = "block";
    return;
  }

  if (playerHasWon()) {
    document.querySelector(".congratulations").style.display = "block";
    return;
  }

  const $container = document.querySelector(".game");
  playerMove(dt, $container);
  laserMove(dt, $container);
  debrisMove(dt,$container);
  

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === LEFT_KEY) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === RIGHT_KEY) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === SPACE_KEY) {
    GAME_STATE.spacePressed = true;
  } else if (e.keyCode === UP_KEY) {
    GAME_STATE.upPressed = true;
  } else if (e.keyCode === DOWN_KEY) {
    GAME_STATE.downPressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === LEFT_KEY) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === RIGHT_KEY) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === SPACE_KEY) {
    GAME_STATE.spacePressed = false;
  } else if (e.keyCode === UP_KEY) {
    GAME_STATE.upPressed = false;
  } else if (e.keyCode === DOWN_KEY) {
    GAME_STATE.downPressed = false;
  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
