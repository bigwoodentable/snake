import Canvas from './canvas';
import randomNumb from './utils';

export default class Food extends Canvas {
  private xFood?: number;
  private yFood?: number;

  constructor() {
    super();
    this.createFood();
  }

  //Creates a random location for the food
  foodLocation() {
    this.xFood = randomNumb(this.canvas.width, this.unitSize);
    this.yFood = randomNumb(this.canvas.height, this.unitSize);
  }

  //Draws the square that represents the food
  createFood() {
    this.drawElement(this.xFood, this.yFood, 'red');
  }

  getXYFood() {
    return { xFood: this.xFood, yFood: this.yFood };
  }
}
