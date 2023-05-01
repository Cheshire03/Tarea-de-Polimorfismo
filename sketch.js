let heroe;
let bullets=[];
let timer=0;
let tiempo=0;
let baddies=[];
let baddieVelocity=5;
let petalos=new Array(15)
let enemy;
let r=0;
let g=100;
let b=1000;

class Enemy{
  constructor(x,y,velLim,life,points){
    this.position=createVector(x,y);
    this.velLim=velLim;
    this.life=life;
    this.points=points;
    this.velocity=createVector(0,0);
  }
  update(){
    let heroePosition=createVector(heroe.position.x-this.position.x,heroe.position.y-this.position.y);
    heroePosition.normalize();
    this.velocity.add(heroePosition);
    this.velocity.limit(this.velLim);
    this.position.add(this.velocity);
  }
  /*display(){
    r+=0.01;
    g+=0.01;
    b+=0.01;
    push()
    translate(this.position)
    for(let i=0;i<petalos.length;i++){
      rotate(TWO_PI/petalos.length);
      fill('red')
      triangle(10,0,0,10,15,15);
    }
    pop()
    fill(150)
    circle(this.position.x,this.position.y,30)
  }*/
  collision(){
    for(let i=0;i<bullets.length;i++){
      
      if(Math.abs(this.position.x-bullets[i].position.x)<25&&Math.abs(this.position.y-bullets[i].position.y)<25){
        this.life-=10;
        bullets.splice(i,1);
        i++;
      }
    }
  }
}

class Spike extends Enemy{
  constructor(x,y,velLim,life,points){
    super(x,y,velLim,life,points)
  }
  display(){
    push()
    translate(this.position)
    for(let i=0;i<petalos.length;i++){
      rotate(TWO_PI/petalos.length);
      fill('red')
      triangle(10,0,0,10,15,15);
    }
    pop()
    fill(150)
    circle(this.position.x,this.position.y,30)
  }
}

class Rainbow extends Enemy{
  constructor(x,y,velLim,life,points){
    super(x,y,velLim,life,points)
  }
  display(){
    push();
    colorMode(HSB);
    fill((5*frameCount) % 360, 100, 100)
    circle(this.position.x,this.position.y,50)
    pop();
  }
}

class Speedy extends Enemy{
  constructor(x,y,velLim,life,points){
    super(x,y,velLim,life,points)
  }
  display(){
    push();
    fill('#E8FF00')
    circle(this.position.x,this.position.y,25)
    pop();
  }
}

class Bullet{
  constructor(diametro,limite){
    this.mouse=createVector(mouseX-heroe.position.x,mouseY-heroe.position.y);
    this.mouse.normalize();
    this.diametro=diametro;
    this.limite=limite;
    this.position=createVector(heroe.position.x,heroe.position.y);
    this.velocity=createVector(0,0);
  }
  display(){
    let distancia=createVector(this.mouse.x,this.mouse.y);
    distancia.mult(33);
    push();
    fill(0,0,255);
    circle(this.position.x+distancia.x,this.position.y+distancia.y,this.diametro)
    pop();
  }
  update(){
    this.velocity.add(this.mouse);
    this.velocity.limit(this.limite)
    this.position.add(this.velocity);
  }
}


class Heroe{
  constructor(){
    this.position=createVector(width/2,height/2);
    this.velocity=createVector(0,0);
    this.acceleration=createVector(0,0);
    this.score=0;
    this.life=10
  }
  display(){
    push();
    fill(120, 234, 255)
    circle(this.position.x,this.position.y,40);
    let mouse=createVector(mouseX-this.position.x,mouseY-this.position.y);
    fill(230)
    translate(this.position)
    rotate(mouse.heading()-HALF_PI);
    rect(0-7.5,0,15,27)
    pop();
  }
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(8);
    this.position.add(this.velocity);
    if(keyIsDown(UP_ARROW)||keyIsDown(87)){
      this.velocity.y-=0.35;
    }
    if(keyIsDown(LEFT_ARROW)||keyIsDown(65)){
      this.velocity.x-=0.35;
    }
    if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)){
      this.velocity.x+=0.35;
    }
    if(keyIsDown(DOWN_ARROW)||keyIsDown(83)){
      this.velocity.y+=0.35;
    }
    
    if(keyIsPressed===false){
      this.velocity.x-=(this.velocity.x/15);
      this.velocity.y-=(this.velocity.y/15);
    }
    }

  checkEdges(){
    if(this.position.x>width){
      this.position.x=0;
    }
    if(this.position.x<0){
      this.position.x=width;
    }
    if(this.position.y>height){
      this.position.y=0;
    }
    if(this.position.y<0){
      this.position.y=height;
    }
  }
    shoot(){
      tiempo++;
      if (tiempo===21){
        tiempo=0;
      }
      if(mouseIsPressed===true&&tiempo===20){
      bullets.push(new Bullet(20,15));
    }
      bullets.forEach(function(value,index,array){
        value.display();
        value.update();
      })
    }
  dispose(){
    for(let i=0;i<bullets.length;i++){
      if(bullets[i].position.x>width||bullets[i].position.y>height||bullets[i].position.x<0||bullets[i].position.y<0){
        bullets.splice(i,1);
        i++;
      }
    }
  }
  scoring(){
    for(let i=0;i<baddies.length;i++){
      if(baddies[i].life===0){
        this.score+=baddies[i].points;
        baddies.splice(i,1);
        i++;
      }
    }
  }
  
  collision(){
    for(let i=0;i<baddies.length;i++){
      
      if(Math.abs(baddies[i].position.x-this.position.x)<30&&Math.abs(baddies[i].position.y-this.position.y)<30){
        this.life-=10;
        textSize(50)
        fill('red')
        text('GAME OVER',width/4,height/2)
        i++;
        noLoop();
      }
    }
  }
  }

function setup() {
  createCanvas(windowWidth,windowHeight);
  enemy=new Enemy(0,0,5,10,10)
  heroe=new Heroe();
}

function draw() {
  background(220);
  textSize(20)
  text('score: '+heroe.score,5,20)
  heroe.display();
  heroe.update();
  heroe.checkEdges();
  heroe.dispose();
  heroe.shoot();
  heroe.scoring();
  heroe.collision()
  //enemy.display();
  //enemy.update();
  timer++;
  baddieVelocity+=0.001;
    if(timer>700){
    timer=0
  }
  if(timer===175){
    baddies.push(new Spike(random(width),0,baddieVelocity,30,10))
  }
  if(timer===350){
    baddies.push(new Speedy(0,random(height),baddieVelocity*1.5,10,20))
  }
  if(timer===525){
    baddies.push(new Rainbow(width,random(height),baddieVelocity*0.2,100,30))
  }
  if(timer===700){
    baddies.push(new Spike(random(width),height,baddieVelocity,30,10))
  }
  push()
  if(timer===165){
    stroke('red')
    strokeWeight(20);
    line(0,1,width,1)
  }
  if(timer===340){
    stroke('red')
    strokeWeight(20);
    line(1,0,1,height)
  }
  if(timer===515){
    stroke('red')
    strokeWeight(20);
    line(width-1,0,width-1,height)
  }
  if(timer===690){
    stroke('red')
    strokeWeight(20);
    line(0,height-1,width,height-1)
  }
  pop()
  baddies.forEach(function(value,index,array){
    value.display();
    value.update();
    value.collision();
  })
}