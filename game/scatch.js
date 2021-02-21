let traps = []
let jump = []
let balls = []

let score
let gameOver
let count
let gameSpeed

let weights = []
let bias = []

let generation = 0

function setup() {
  count = 100
  gameSpeed = 1

  createCanvas(windowWidth, windowHeight)

  if(generation == 0){
    for(i = 0; i < 10; i++) {
      weights[i] = random(-10, 10)
      bias[i] = random(-1000, 1000)
    }
  }
  console.log(weights)
  console.log(bias)


  for (i = 0; i < count; i++) {
    let j = Math.floor(i/10)
    let w = weights[j]+random(-2,2)
    let b = bias[j]+random(-200,200)
    // console.log(i + ": " + w)
    // console.log(i + ": " + b)

    balls[i] = new Ball(w,b)
    jump[i] = 0
  }

  for (i = 0; i < 3; i++) {
    traps[i] = new Trap(random(windowWidth*i,windowWidth*(i+1)))
  }

  score = 0
  gameOver = false
}
//let flag = true;
function draw() {
  let aliveCount = 0
  balls.forEach(ball => {
    if(ball.alive) {
      aliveCount++;
    }
  });
  background(0)

  fill(255)
  rect(0, windowHeight/2+windowHeight*0.09/2, windowWidth, windowHeight*0.02)

  textSize(windowHeight*0.05)
  text("Score: " + score + "; Generation: " + generation + "; Population size: " + aliveCount, windowHeight*0.1, windowHeight*0.1)


  collisionCheck()
  for (i = 0; i < count; i++) {
    brainRequest(balls[i], i)
    if(jump[i] == 1) {
      balls[i].jump()
    }
    balls[i].display()
  }

  traps.forEach (trap => {
    if(!gameOver){
      trap.move()
    }
    trap.display()
  })

  if(gameOver || score >= 25) {

    let indexes = [0,0,0,0,0,0,0,0,0,0]

    for(i = 0; i < count; i++) {
      for(j = 0; j < 10; j++) {
        if(balls[i].fitness > balls[indexes[j]].fitness) {
          indexes[j] = i
          break;
        }
      }
    }
    console.log("indexes")
    
    console.log(indexes)

    weights = []
    bias = []
    indexes.forEach(element => {
      weights.push(balls[element].weight)
      bias.push(balls[element].bias)
      //console.log(balls[element].weight)
    });

    generation++
    setup();
    //flag = false
    //gameOver = true;

    // balls.forEach(ball => {
    //   //console.log(ball.fitness)

    //   setup()
    // })
  }

  gameSpeed+=0.002
}


function collisionCheck() {
  let allDead = 1;
  balls.forEach(ball => {
    if(ball.alive) {
      allDead = 0;
      let x = ball.x
      let y = ball.y

      let rx = [];

      traps.forEach(trap => {
        rx.push(trap.x)
        rx.push(trap.x+windowHeight*0.09/2)
      })
      let rY = windowHeight/2-windowHeight*0.07/2

      rx.forEach(p => {
        if(dist(x,y,p,rY) < windowHeight*0.09/2){
          ball.alive = false;
        }
      });
    } 
  })
  if(allDead) {
    gameOver = true;
  }
}