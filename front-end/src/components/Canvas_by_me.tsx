import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CanvasProps, CanvasType, GameState } from '../type/pongType';
import socketio from "socket.io-client";
// import * as S from '../styles/canvasStyle';

export const socket = socketio('http://localhost:3000')

const Canvas: React.FC<CanvasType> = ({ draw, ...props } : any, canvasRef) => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0})
  const [canvasStyle, setCanvasStyle] = useState({ width: '', height: ''})

  const scale = (context: any) => {
    const ratio = window.devicePixelRatio || 1;

    setCanvasSize({ ...canvasSize, width: props.width * ratio });
    setCanvasSize({ ...canvasSize, height: props.height * ratio });

    setCanvasStyle({ ...canvasStyle, width: `${props.width}px` });
    setCanvasStyle({ ...canvasStyle, height: `${props.height}px` });

    context.scale(ratio, ratio);
  };

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

    scale(context);
    draw(context);
    return () => context.clearRect(0, 0, window.innerWidth, 400);
  }, [draw, canvasRef]);

  if (!canvasRef) {
    return null;
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        // onTouchMove={keyDownHandler}
        width={props.width}
        height={props.height}
        style={{
          border: "2px solid #000",
          width: `${props.width}px`,
          height: `${props.height}px`
        }}
        id="canvas"
        tabIndex={0}
        aria-label="Second Brain"
      >
        Alternative content describing what the canvas displays.
      </canvas>
    </div>
  );
}

export default Canvas;