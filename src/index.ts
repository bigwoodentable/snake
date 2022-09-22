// import Snake from "./snake"

export default class Canvas {
  protected canvas: HTMLCanvasElement;
  protected ctx: any;
  protected rows: number;
  protected columns: number;
  protected unitSize: number;
  protected speedFactor: number;

  constructor() {
    this.canvas = document.querySelector('.arena') as HTMLCanvasElement;
    this.ctx = this.canvas?.getContext('2d');
    this.unitSize = 10;
    this.speedFactor = 1;
    this.rows = this.canvas.height / this.unitSize;
    this.columns = this.canvas.width / this.unitSize;
  }
}
class Snake extends Canvas {
  private x: number;
  private y: number;
  private xNext: number;
  private yNext: number;

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
    this.draw();
    this.move();
    this.turn();
  }

  draw(): void {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(this.x, this.y, this.unitSize, this.unitSize);
  }

  move(): void {
    window.setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.update();
      this.draw();
    }, 250);
  }

  turn(): void {
    window.addEventListener('keydown', (e): void | null => {
      switch (e.key) {
        case 'ArrowUp':
          this.xNext = 0;
          this.yNext = -this.unitSize * this.speedFactor;
          this.update();
          break;
        case 'ArrowDown':
          this.xNext = 0;
          this.yNext = this.unitSize * this.speedFactor;
          this.update();
          break;
        case 'ArrowRight':
          this.xNext = this.unitSize * this.speedFactor;
          this.yNext = 0;
          this.update();
          break;
        case 'ArrowLeft':
          this.xNext = -this.unitSize * this.speedFactor;
          this.yNext = 0;
          this.update();
          break;
        default:
          return null;
          break;
      }
    });
  }

  update(): void {
    this.x += this.xNext;
    this.y += this.yNext;
  }
}
const canvas = new Canvas();
const snake = new Snake(10, 10);
