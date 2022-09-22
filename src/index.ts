// import Snake from "./snake"

export default class Canvas {
  protected canvas: HTMLCanvasElement;
  protected ctx: any;
  protected rows: number;
  protected columns: number;
  protected unitSize: number;
  protected speedFactor: number;
  protected interval: number;

  constructor() {
    this.canvas = document.querySelector('.arena') as HTMLCanvasElement;
    this.ctx = this.canvas?.getContext('2d');
    this.unitSize = 10;
    this.speedFactor = 1;
    this.interval = 0;
    this.rows = this.canvas.height / this.unitSize;
    this.columns = this.canvas.width / this.unitSize;
  }

  drawElement(x: number, y: number, color: string = '#FFFFFF'): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.unitSize, this.unitSize);
  }
}
class Snake extends Canvas {
  private x: number;
  private y: number;
  private xNext: number;
  private yNext: number;
  private xFood?: number;
  private yFood?: number;

  constructor(
    x: number = 0,
    y: number = 0,
    xNext: number = 0,
    yNext: number = 0
  ) {
    super();
    this.x = x;
    this.y = y;
    this.xNext = this.unitSize * this.speedFactor;
    this.yNext = yNext;
    this.drawElement(this.x, this.y);
    this.move();
    this.turn();
    this.createFood();
    this.hasEaten();
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

      clearInterval(this.interval);
      this.move();
    });
  }

  move(xFood?: number, yFood?: number): void {
    // every 250 interval the code runs
    this.interval = window.setInterval(() => {
      this.ctx.clearRect(this.x, this.y, this.unitSize, this.unitSize);
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.update();
      this.hasEaten();
      this.drawElement(this.x, this.y);
    }, 250);
  }

  update(): void {
    this.x += this.xNext;
    this.y += this.yNext;

    if (this.x === this.canvas.width) {
      this.x = 0;
    } else if (this.x === 0) {
      this.x = this.canvas.width;
    }
    if (this.y === this.canvas.height) {
      this.y = 0;
    } else if (this.y === 0) {
      this.y = this.canvas.height;
    }
  }

  createFood() {
    this.xFood = randomNumb(this.canvas.width, this.unitSize);
    // change to this.canvas.height, using canvas.width for now as canvas is a square
    this.yFood = randomNumb(this.canvas.width, this.unitSize);
    this.drawElement(this.xFood, this.yFood);
  }

  hasEaten(): void {
    if (this.xFood === this.x && this.yFood === this.y) {
      this.createFood();
    }
  }
}

const canvas = new Canvas();
const snake = new Snake(10, 10);

// Transfer to Utils.ts

function randomNumb(canvasWidth: number, unitSize: number): number {
  return Math.floor((Math.random() * canvasWidth) / unitSize) * unitSize;
}
