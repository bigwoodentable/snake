export default class Canvas {
  protected canvas: HTMLCanvasElement;
  protected ctx: any;
  protected unitSize: number;
  protected speedFactor: number;
  protected interval: number;

  constructor() {
    this.canvas = document.querySelector('.arena') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.unitSize = 10;
    this.speedFactor = 1;
    this.interval = 0;
  }

  drawElement(
    x?: number,
    y?: number,
    color: string = '#FFFFFF',
    body?: { x: number; y: number }[]
  ): void {
    // fillRect fills the rectangle with the color of fillStyle - fillRect(x,y,width,height)
    this.ctx.fillStyle = color;

    //draws the snake's body
    if (body !== undefined) {
      body.forEach((coord) =>
        this.ctx.fillRect(coord.x, coord.y, this.unitSize, this.unitSize)
      );
    }
    //draws the head and the food
    this.ctx.fillRect(x, y, this.unitSize, this.unitSize);
  }
}
