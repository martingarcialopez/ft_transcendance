export type CanvasProps = {
  canvasWidth: number;
  canvasHeight: number;
};

export type Position = {
  x: number;
  y: number;
};

export type GameState = {
  ballPos: { x: number, y: number };
  ballVel: { x: number, y: number };
  leftPaddle: number;
  rightPaddle: number;
  leftScore: number;
  rightScore: number;
}

export type CanvasType = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: (context: CanvasRenderingContext2D) => void;
};

export enum Direction {
  UP,
  DOWN,
}

export const BALL_RADIUS   = 10;
export const PADDLE_WIDTH  = 20;
export const PADDLE_HEIGTH = 70;