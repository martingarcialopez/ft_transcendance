import { useRef, useState } from 'react';
import { Direction, GameState } from '../type/pongType';
import socketio from "socket.io-client";
import { Button } from '@mui/material';
import Canvas from '../components/Canvas';
import { GameWrapper } from '../styles/gameStyle';
// import Canvas from '../components/Canvas';

export const socket = socketio('http://localhost:3000')

const window_size = {
    canvasWidth: 600,
    canvasHeight: 300,
}

export const Pong = () => {
    // Use a ref to access the Canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<GameState>({
        ballPos: { x: 50, y: 50 },
        ballVel: { x: 20, y: 16 },
        leftPaddle: 150,
        rightPaddle: 150,
        leftScore: 0,
        rightScore: 0,
    });
    const [id, setId] = useState(0);

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log("event code = ")
        console.log(event.code)
        switch (event.code) {
            case 'KeyS' || 'ArrowDown':
                socket.emit('move', id.toString(), "leftplayer", 1);
                setId(id + 1);
                break;
            case 'KeyW' || 'ArrowUp':
                socket.emit('move', id.toString(), "leftplayer", -1);
                setId(id + 1);
                break;
        }
        console.log("id = ");
        console.log(id);
    };

    const receive_socket_info = () => {
        socket.on('gameState', (...args) => {
            setGameState(args[0])
            // console.log(args);
            // console.log(args[0]);
            // console.log(args[0].ballPos);
            // console.log(args[0].ballPos.x);
            // console.log(args[0].ballPos.y);
            // console.log(gameState);
        });
    }

    function handleClick() {
        socket.emit('startGame');
        console.log("HANDKE CKUC")
        receive_socket_info();
    }

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(gameState.ballPos.x, gameState.ballPos.y, 20, 15)

        ctx.fillStyle = "green";
        ctx.fillRect(0, gameState.leftPaddle, 20, 70)

        ctx.fillStyle = "red";
        ctx.fillRect(window_size.canvasWidth - 20, gameState.rightPaddle, 20, 70)

        ctx.fillStyle = "black";
        ctx.fillText(gameState.rightScore.toString(), window_size.canvasWidth - 100, 50);

        ctx.fillStyle = "black";
        ctx.fillText(gameState.leftScore.toString(), 100, 50);

        ctx.stroke()
    };

    return (
        <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
            <Button onClick={handleClick}>Send event</Button>
            <Canvas ref={canvasRef} draw={drawGame} width={window_size.canvasWidth} height={window_size.canvasHeight} />
        </GameWrapper>
    );
}