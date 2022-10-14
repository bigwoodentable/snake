export default function randomNumb(
  canvasWidth: number,
  unitSize: number
): number {
  return Math.floor((Math.random() * canvasWidth) / unitSize) * unitSize;
}
