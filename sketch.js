let play = 1;
let end = 0;
let gameStatus = play;
let trex, trex_running, trex_collided;
let ground, invisible_ground, ground_img;
let clouds_group, cloud_img;
let obstaculos_groups, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
let score = 0;
let gameover, gameover_img, restart, restart_img;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  gameover_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}

function setup(){
  createCanvas(600, 200);

  // Trex
  trex = createSprite(50,140, 20, 50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.6; // ele redimensiona a imagem.
  //trex.addSpeed(4,2);

  // Ground
  ground = createSprite(200, 150, 400, 20);
  ground.addImage(ground_img);
  ground.velocityX = -(6+(score/100)); // deixa ir para a esquerda.
  ground.x = ground.width/2;
  invisible_ground = createSprite(200, 190, 400, 20);
  invisible_ground.visible = false;

  // Game Over e Restart
  gameover = createSprite(300, 100);
  gameover.addImage(gameover_img);
  gameover.visible = false;

  restart = createSprite(300, 100);
  restart.addImage(restart_img);
  restart.visible = false;

  // Clouds e Obstaculos
  clouds_group = new Group()
  obstaculos_groups = new Group()
}

function draw(){
  background("#F0F0F0");
  text("Pontuação: "+score, 500, 50);
  if(gameStatus === play){
    score = score+Math.round(getFrameRate()/60) // Retorna so o inteiro. GetFrameRate retorna o número de frames que foram exibidos a cada segundo
    //console.log(score);
    ground.velocityX = -(6+(score/100));
    trex.changeAnimation("running", trex_running);
    if(keyDown("space") && trex.y >= 139){
      trex.velocityY = -12;
      console.log("Pulou");
    }
    trex.velocityY = trex.velocityY + 0.8;
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    trex.collide(invisible_ground); // Verifica se o trex esta colidindo com invisible ground
    spawnClouds();
    obstacles();
    if(obstaculos_groups.isTouching(trex)){ 
     gameStatus = end; 
    }
  }
  else if(gameStatus === end){
      gameover.visible = true;
      restart.visible = true;
      ground.velocityX = 0;
      trex.velocityY = 0;
      obstaculos_groups.setVelocityXEach(0);
      clouds_group.setVelocityXEach(0);
      trex.changeAnimation("collided", trex_collided);
      obstaculos_groups.setLifetimeEach(-1);
      clouds_group.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)){ // Se esse sprite (restart) esta sendo clicado vai executar
        reset();
      }
  }
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 60 === 0){ // Se o resto da divisão que a % faz for 0 vai executar
    cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(50, 100));
    cloud.addImage(cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200; // O tempo de vida da variavel cloud
    cloud.depth = trex.depth; // Profundidade
    trex.depth = trex.depth + 1;
    clouds_group.add(cloud);
  }
}

function obstacles(){
  if(frameCount % 60 === 0){ // Se o resto da divisão que a % faz for 0 vai executar
    obstaculo = createSprite(600, 165, 10, 40);
    obstaculo.velocityX = -(6+(score/100));
    randomNumber = Math.round(random(1,6));
    if(randomNumber === 1){
      obstaculo.addImage(obstaculo1);
    }
    if(randomNumber === 2){
      obstaculo.addImage(obstaculo2);
    }
    if(randomNumber === 3){
      obstaculo.addImage(obstaculo3);
    }
    if(randomNumber === 4){
      obstaculo.addImage(obstaculo4);
    }
    if(randomNumber === 5){
      obstaculo.addImage(obstaculo5);
    }
    if(randomNumber === 6){
      obstaculo.addImage(obstaculo6);
    }
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
    obstaculos_groups.add(obstaculo);
  }
}

function reset(){
  gameStatus = play;
  gameover.visible = false;
  restart.visible = false;
  obstaculos_groups.destroyEach();
  clouds_group.destroyEach();
  score = 0;
}
