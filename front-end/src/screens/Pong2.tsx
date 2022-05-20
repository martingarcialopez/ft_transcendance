import { useRef, useState } from 'react';
import { BALL_RADIUS, GameState, PADDLE_HEIGTH, PADDLE_WIDTH } from '../type/pongType';
import socketio from "socket.io-client";
import { Button, Grid } from '@mui/material';
import Canvas from '../components/Canvas';
import { GameWrapper } from '../styles/gameStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { UserState } from '../redux/reducers/userReducers';
import { URL_test } from '../constants/url';
import { ColumnGroupingTable } from '../components/ColumnGroupingTable';
// import Canvas from '../components/Canvas';

export const socket = socketio(`${URL_test}`)

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
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )
    const [playerSide, setPlayerSide] = useState('');
    const [roomId, setRoomId] = useState('');
    const [opponent, setOpponent] = useState('');

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log("event code = ")
        console.log(event.code)
        switch (event.code) {
            case 'KeyS' || 'ArrowDown':
                socket.emit('move', id.toString(), playerSide, roomId, 1);
                setId(id + 1);
                break;
            case 'KeyW' || 'ArrowUp':
                socket.emit('move', id.toString(), playerSide, roomId, -1);
                setId(id + 1);
                break;
        }
        // console.log("id = ");
        // console.log(id);
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
            console.log("winnerPlayer")
            console.log(winnerPlayer)
            setWinner(winnerPlayer);
            setGameStarted(false);
        });
    }

    function handleClick() {
        socket.emit('lookingForplay', userLogin.userInfo.id);

        // console.log("HANDKE CKUC")
        setWinner('');
        receive_socket_info();
    }

    socket.on('GameInfo', (...args) => {
        console.log("roomId / side");
        console.log(args);
        console.log(args[0]);
        console.log(args[1]);
        // console.log(side);
        setRoomId(args[0])
        setPlayerSide(args[1])
        setGameStarted(true);
    });

    socket.on('GamePlayerName', (...args) => {
        console.log("GamePlayerName");
        console.log(args);
        console.log(args[0]);
        console.log(args[1]);
        // console.log(side);
        userLogin.userInfo.username = args[0];
        setOpponent(args[1])
        if (playerSide === 'leftPlayer')
        {
            userLogin.userInfo.username = args[1];
            setOpponent(args[0])
        }
    });

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        var img = new Image();
        if (winner !== '') {
            if (winner === 'leftPlayer')
                img.src = "./game/left_win.jpeg"
            else
                img.src = "./game/right_win.jpeg"

            ctx.drawImage(img, 0, 0, window_size.canvasWidth, window_size.canvasHeight);
        }
        else if (gameStarted === false) {
            img.src = "./game/cyberpong.jpeg"

            ctx.drawImage(img, 0, 0, window_size.canvasWidth, window_size.canvasHeight);
        }
        else {
            ctx.fillStyle = "blue";
            // ctx.fillRect(gameState.ballPos.x, gameState.ballPos.y, 20, 15)
            ctx.beginPath();
            ctx.clearRect(gameState.ballPos.x - BALL_RADIUS - 1, gameState.ballPos.y - BALL_RADIUS - 1, BALL_RADIUS * 2 + 2, BALL_RADIUS * 2 + 2);
            ctx.closePath();

            ctx.arc(gameState.ballPos.x, gameState.ballPos.y, 10, 0, 2 * Math.PI)
            ctx.fillStyle = 'black';
            ctx.fill();

            ctx.fillStyle = "green";
            ctx.fillRect(0, (gameState.leftPaddle - (PADDLE_HEIGTH / 2)), PADDLE_WIDTH, PADDLE_HEIGTH)

            ctx.fillStyle = "red";
            ctx.fillRect((window_size.canvasWidth - PADDLE_WIDTH), (gameState.rightPaddle - (PADDLE_HEIGTH / 2)), PADDLE_WIDTH, PADDLE_HEIGTH)

            ctx.fillStyle = "black";
            ctx.font = '16px Palantino';
            ctx.fillText(gameState.rightScore.toString(), window_size.canvasWidth - 100, 50);

            ctx.fillStyle = "black";
            ctx.fillText(gameState.leftScore.toString(), 100, 50);

            ctx.stroke()
        }
    };

    return (
        <div >
            {gameStarted === false ?
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={3}>
                        <Button variant="outlined" onClick={handleClick}>
                            {winner === '' ? (
                                <div>
                                    Find a game
                                </div>
                            ) : (
                                <div>
                                    Restart Game
                                </div>
                            )}
                        </Button>
                    </Grid>
                </Grid>
                :
                <div>
                    <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
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
                    <ColumnGroupingTable side={playerSide} username={userLogin.userInfo.username} opponent={opponent} />
                </div>
            }
        </div>
    );
}