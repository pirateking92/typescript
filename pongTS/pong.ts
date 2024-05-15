// follow along with this video https://www.youtube.com/watch?v=jrqN0uZwhwk
// global variables
var DIRECTION = {
  IDLE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
}; // Everything has to end with a semi colon

var rounds = [5, 5, 3, 3, 2]; // an array that sets up the points needed to win each round
var colors = ["#1abc9c", "#2ecc71", "#3498db", "#8c52ff", "#9b59b6"]; // a shade of cyan, a shade of green, a shade of medium blue, a shade of violet, a shade of purple

var Ball = {
  new: function (incrementedSpeed) {
    return {
      width: 18,
      height: 18,
      x: this.canvas.width / 2 - 9,
      y: this.canvas.height / 2 - 9,
      moveX: DIRECTION.IDLE,
      moveY: DIRECTION.IDLE,
      speed: incrementedSpeed || 7,
    };
  },
};

// The ai object (the element on the right side we're playing against)

var Ai = {
  // capitals are not a requirement but a common convention
  new: function (side) {
    return {
      width: 18,
      height: 180,
      x: side === "left" ? 150 : this.canvas.width - 150,
      y: this.canvas.height / 2 - 35,
      score: 0,
      move: DIRECTION.IDLE,
      speed: 8,
    };
  },
};

var Game = {
  initialize: function () {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = 1400;
    this.cancas.height = 1000;

    this.canvas.style.width = this.canvas.width / 2 + "px";
    this.canvas.sytle.height = this.canvas.height / 2 + "px";

    this.player = Ai.new.call(this, 'left');
    this.ai = Ai.new.call(this, 'right');
    this.ball = Ball.new.call(this);

    this.ai.speed = 5;
    this.running = this.over = false;
    this.turn = this.ai;
    this.timer = this.round = 0;
    this.color = '#8c52ff'

    Pong.menu();
    Pong.listen();
  },

  endGameMenu: function (text) {
    Pong.context.font = '45px Courier New';
    Pong.context.fillstyle = this.color;

    Pong.context.fillRect(
      Pong.canvas.width / 2 - 350,
      Pong.canvas.height / 2 - 48,
      700,
      100
    );
    Pong.context.fillStyle = '#ffffff';

    Pong.context.fillText(text,
      Pong.canvas.width / 2,
      Pong.canvas.height / 2 + 15
    );
    
    setTimeout(function () {
      Pong = Object.assign({}, Game);
      Pong.initialize();
    }, 3000);
  },

  menu: function () {
    // Draw al lthe pong objects in their current state
    Pong.draw();

    // change the canvas font and color
    this.context.font = '50px Courier New';
    this.context.fillStyle = this.color;

    // draw the rectangle behind the 'Press any key to begin' text
    this.context.fillRect(
      this.canvas.width / 2 -350,
      this.canvas.height / 2 -48,
      700,
      100
    );
    // change the canvas color
    this.context.fillStyle = '#ffffff';
    //  draw the 'press any key to begin' text
    this.context.fillText('Press any key to begin', 
      this.canvas.width / 2,
      this.canvas.height / 2 + 15
    );
  },

  // update all objects (move the player, ai, ball, increment the score)

  update: function () {
    if (!this.over) {
      // ball collision stuff which corrects the x and y coords
      if (this.ball.x <= 0) Pong._resetTurn.call(this, this.ai, this.player);
      if (this.ball.x >= this.canvas.width - this.ball.width) Pong._resetTurn.call(this, this.player, this.ai);
      if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
      if (this.ball.y >= this.canvas.height - this.ball.height) this.ball.moveY = DIRECTION.UP;

      // move player if the player.move value was updated by a keyboard event
      if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
      else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;

      // on new serve (start of each turn) move the ball to the correct side and randomise the direction to add some challenge
      if (Pong._turnDelayIsOver.call(this) && this.turn) {
        this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
        this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
        this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200;
        this.turn = null;
      }

      // collision with bound limits
    }
  }