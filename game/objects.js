class Ball {
  constructor(weight, bias) {
    this.x = 100 + Math.floor(random(100));
    this.y = windowHeight/2;
    this.inAir = false;
    this.falling = false;
    this.color1 = Math.floor(random(255));
    this.color2 = Math.floor(random(255));
    this.color3 = Math.floor(random(255));
    this.alive = true;
    this.weight = weight;
    this.bias = bias;
    this.fitness = 0;
  }

  jump() {
    if(!this.inAir) {
      this.inAir = true;
    }
  }

  display() {
      if(this.alive){

      if (this.inAir) {
        if(this.y < windowHeight/2 - windowHeight*0.09*2){
          this.falling = true;
        }
        if(this.falling) {
          this.y += 4*gameSpeed;
          if (this.y >= windowHeight/2){
            this.y = windowHeight/2;
            this.inAir = false;
            this.falling = false;
          }
        }else {
          this.y -= 3*gameSpeed;
        }
      }


      //fill(255, 51, 51);
      fill(this.color1, this.color2, this.color3);

      ellipse(this.x, this.y, windowHeight*0.09, windowHeight*0.09);
    }
  }
}

class Trap {
  constructor(offset) {
    this.x = windowWidth+offset;
    this.y = windowHeight/2-windowHeight*0.07/2;
  }

  move() {
    this.x -= 4*gameSpeed

    if (this.x < -windowHeight*0.09/2) {
      let max = Math.round(Math.max(traps[0].x,traps[1].x,traps[2].x))
      //console.log(max)
      this.x = max+random(windowWidth/2,windowWidth*1.5);
      score++;
      balls.forEach(ball => {
        if(ball.alive) {
          ball.fitness++
        }
      })
    }
  }

  display() {
    fill(255);
    rect(this.x, this.y, windowHeight*0.09/2,  windowHeight*0.08);
  }
}