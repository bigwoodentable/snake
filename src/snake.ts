import Canvas from './canvas';
import Food from './food';

interface Coordinates {
  x: number;
  y: number;
}

export default class Snake extends Canvas {
  private food: Food;
  private x: number;
  private y: number;
  private xNext: number;
  private yNext: number;
  private total: number;
  private body: Required<Coordinates>[];

  constructor(food: Food, x: number = 0, y: number = 0) {
    super();
    this.food = food;
    this.x = x;
    this.y = y;
    this.xNext = this.unitSize * this.speedFactor;
    this.yNext = 0;
    this.total = 0;
    this.body = [];
    this.move();
    this.turn();
    this.hasEaten();
    this.food.createFood();
  }

  turn(): void {
    window.addEventListener('keydown', (e): void | null => {
      switch (e.key) {
        case 'ArrowUp':
          this.xNext = 0;
          this.yNext = -this.unitSize * this.speedFactor;
          break;
        case 'ArrowDown':
          this.xNext = 0;
          this.yNext = this.unitSize * this.speedFactor;
          break;
        case 'ArrowRight':
          this.xNext = this.unitSize * this.speedFactor;
          this.yNext = 0;
          break;
        case 'ArrowLeft':
          this.xNext = -this.unitSize * this.speedFactor;
          this.yNext = 0;
          break;
        default:
          break;
      }
    });
  }

  move(): void {
    this.food.foodLocation();

    // every 250 interval the code runs
    //this.interval is used for clearInterval(this.interval) to stop
    this.interval = window.setInterval(() => {
      // this.ctx.clearRect(this.x, this.y, this.unitSize, this.unitSize);
      //creates the illusion of movement by clearing the rect at each interval and re-drawing the snake in the next position
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //at each 'frame' the food is drawn again, because this.foodlocation() is set outside of this interval, the location is the same
      this.food.createFood();
      // check if it's dead
      this.die();
      // check if it ate food
      this.hasEaten();
      this.update();
      //the this.update() function updates this.x and this.y which intotal makes the snake's position move
      this.drawElement(this.x, this.y, undefined, this.body);
    }, 250 / this.speedFactor);
  }

  //imp
  update(): void {
    //this allows after hasEaten, the length of body to shift, so the coordinates of index 1 will become index 2 etc. making it look like it's moving
    //the last index would normally be undefined, but because of the line of code after this, the last index of the snake is updated as the new (x,y) after this.x or this.y is incremented based on this.xNext or this.yNext (which are set with turn())
    //it never gets to the last index because of this.body.length - 1

    for (let i = 0; i < this.body.length - 1; i++) {
      this.body[i] = this.body[i + 1];
    }

    // When the snake is not eating, it replaces the old (x,y) with a new (x,y) in the last index of the body array, which would otherwise be undefined because of the previous line of code where coordinates are shifted to the left, and the right of the last index is undefined
    // Because of the line above, the newest co-ordinates here, would eventually be passed down through the body array an index at a time
    // when the snake eats food, together with the total += 1 in hasEaten, it pushes a new {x,y} into the body array
    // this.body is used in drawElement to draw the snake's body
    // refactor: when this.total === 0, the following code is this.body["-1"]... the key is a string
    this.body[this.total - 1] = { x: this.x, y: this.y };

    //incrementing this.x and this.y makes the snake move, turn() determines what this.xNext and this.yNext are, which in turn determines how this.x and this.y incrememnts, determining the direction of the snake's movement
    this.x += this.xNext;
    this.y += this.yNext;

    //wraps around if the snake goes beyond the boundaries of the canvas
    if (this.x >= this.canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = this.canvas.width;
    }
    if (this.y >= this.canvas.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = this.canvas.height;
    }
  }

  hasEaten(): void {
    const xFood: number | undefined = this.food.getXYFood().xFood;
    const yFood: number | undefined = this.food.getXYFood().yFood;

    if (xFood === this.x && yFood === this.y) {
      this.total += 1;
      this.food.foodLocation();
      this.food.createFood();
    }
  }

  //Considered dead if it hits itself
  die() {
    if (this.body.find((coord) => coord.x === this.x && coord.y === this.y))
      console.log('DEAD');
  }
}
