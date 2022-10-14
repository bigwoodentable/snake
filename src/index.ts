import Canvas from './canvas';
import Food from './food';
import Snake from './snake';

const canvas: Canvas = new Canvas();
const food: Food = new Food();
const snake: Snake = new Snake(food);
