import React, { forwardRef, useEffect } from 'react';
import * as S from '../styles/canvasStyle';

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: (context: CanvasRenderingContext2D) => void;
};

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ draw, ...props }, canvasRef) => {
    useEffect(() => {
      if (!canvasRef) {
        return;
      }
      const canvas = (canvasRef as React.RefObject<HTMLCanvasElement>).current;
      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      draw(context);
      return () => context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }, [draw, canvasRef]);

    if (!canvasRef) {
      return null;
    }

    return (
      <S.Canvas width={props.width} height={props.height} ref={canvasRef as any} {...props} />
    );
  }
);

export default Canvas;
