export type CanvasProps = {
  canvasWidth: number;
  canvasHeight: number;
};

export type Point = {
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