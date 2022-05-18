import { useRef, useState } from 'react';
import { GameState, PADDLE_HEIGTH, PADDLE_WIDTH } from '../type/pongType';
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
        ballPos: { x: window_size.canvasWidth / 2, y: window_size.canvasHeight / 2 },
        ballVel: { x: 10, y: 10 },
        leftPaddle: window_size.canvasHeight / 2,
        rightPaddle: window_size.canvasHeight / 2,
        leftScore: 0,
        rightScore: 0,
    });
    const [id, setId] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [winner, setWinner] = useState('');
    const [eventCode, setEventCode] = useState('');

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log("event code = ")
        console.log(event.code)
        switch (event.code) {
            case 'KeyS' || 'ArrowDown':
                setEventCode('Up');
                break;
            case 'KeyW' || 'ArrowUp':
                setEventCode('Down');
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
        socket.on('gameOver', (winnerPlayer) => {
            console.log(winnerPlayer)
            setWinner(winnerPlayer);
        });
    }

    function handleClick() {
        socket.emit('startGame');
        console.log("HANDKE CKUC")
        setWinner('');
        setGameStarted(true);
        receive_socket_info();
    }

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        if (eventCode === 'Up') {
            socket.emit('move', id.toString(), "leftplayer", 1);
            setId(id + 1);
        }
        if (eventCode === 'Down') {
            socket.emit('move', id.toString(), "leftplayer", -1);
            setId(id + 1);
        }
        setEventCode('');
        ctx.fillStyle = "blue";
        ctx.fillRect(gameState.ballPos.x, gameState.ballPos.y, 20, 15)

        ctx.fillStyle = "green";
        ctx.fillRect(0, (gameState.leftPaddle - (PADDLE_HEIGTH / 2)), PADDLE_WIDTH, PADDLE_HEIGTH)

        ctx.fillStyle = "red";
        ctx.fillRect((window_size.canvasWidth - PADDLE_WIDTH), (gameState.rightPaddle - (PADDLE_HEIGTH / 2)), PADDLE_WIDTH, PADDLE_HEIGTH)

        ctx.fillStyle = "black";
        ctx.fillText(gameState.rightScore.toString(), window_size.canvasWidth - 100, 50);

        ctx.fillStyle = "black";
        ctx.fillText(gameState.leftScore.toString(), 100, 50);

        ctx.stroke()
    };

    return (
        <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
            {gameStarted === false ?
                <Button onClick={handleClick}>
                    {winner === '' ? (
                        <div>
                            Start Game
                        </div>
                    ) : (
                        <div>
                            Restart Game
                        </div>
                    )}
                </Button>
                :
                <div>
                    PONG
                </div>
            }
            <Canvas ref={canvasRef} draw={drawGame} width={window_size.canvasWidth} height={window_size.canvasHeight} />
            {winner === '' ? (
                <div>
                    Partie en cours.
                </div>
            ) : (
                <div>
                    {winner} a gagné la partie !
                </div>
            )}
        </GameWrapper>
    );
}