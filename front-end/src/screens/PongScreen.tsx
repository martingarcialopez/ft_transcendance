import { useEffect, useRef, useState } from 'react';
import { BALL_RADIUS, GameState, PADDLE_HEIGTH, PADDLE_WIDTH } from '../type/pongType';
import socketio from "socket.io-client";
import { Button, Grid } from '@mui/material';
import Canvas from '../components/Canvas';
import "../styles/gameStyle.css";
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { UserState } from '../redux/reducers/userReducers';
import { URL_test } from '../constants/url';
import { ColumnGroupingTable } from '../components/ColumnGroupingTable';
import { ResponsiveDialog } from '../components/ResponsiveDialog';
// import Canvas from '../components/Canvas';
import ButtonGroup from '@mui/material/ButtonGroup';

export const socket = socketio(`${URL_test}`)

const window_size = {
    canvasWidth: 600,
    canvasHeight: 300,
}

export const Pong = () => {
    const [progress, setProgress] = useState(10);
    const [colorBackground, setColorBackground] = useState('white');
    const [difficulty, setDifficulty] = useState("Normal");
    const [searchOpponent, setSearchOpponent] = useState("Waiting for an opponent");
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
    const { userInfo }: UserState = userLogin;

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 30 ? 0 : prevProgress + 10));
            if (progress === 0)
                setSearchOpponent("Waiting for an opponent")
            else
                setSearchOpponent((prevProgress) => prevProgress + '.')

        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, [progress]);

    if (userLogin.showLoading || !userInfo) {
        return <h1>Loading...</h1>;
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log("onKeyDownHandler event code :", event.code)
        switch (event.code) {
            case 'KeyS' || 'ArrowDown':
                console.log("socket.emit -1 id.toString()", id.toString(), "playerSide :", playerSide, "roomId:", roomId);
                socket.emit('move', id.toString(), playerSide, roomId, 1);
                setId(id + 1);
                break;
            case 'KeyW' || 'ArrowUp':
                console.log("socket.emit +1 id.toString()", id.toString(), "playerSide :", playerSide, "roomId:", roomId);
                socket.emit('move', id.toString(), playerSide, roomId, -1);
                setId(id + 1);
                break;
        }
    };

    const receive_socket_info = () => {
        socket.on('gameState', (...args) => {
            console.log("socket.on gameState");
            setGameState(args[0])
            setGameStarted(true);
            // console.log(args);
            // console.log(args[0]);
            // console.log(args[0].ballPos);
            // console.log(args[0].ballPos.x);
            // console.log(args[0].ballPos.y);
            // console.log(gameState);
        });
        socket.on('gameOver', (winnerPlayer) => {
            console.log("socket.on gameOver");
            console.log("winnerPlayer :", winnerPlayer)
            setWinner(winnerPlayer);
            setGameStarted(false);
            endGame();
        });
    }

    function handleClick() {
        if (userInfo) {
            console.log("socket.emit lookingForAGame / userInfo.id: ", userInfo.id);
            socket.emit('lookingForAGame', userInfo.id, difficulty);
        }

        // console.log("HANDKE CKUC")
        setGameStarted(true);
        setOpponent('')
        setWinner('')
        receive_socket_info();
    }

    socket.on('GameInfo', (...args) => {
        console.log("socket.on GameInfo");
        console.log("roomId / side", args);
        // console.log("args[0]: ", args[0]);
        // console.log("args[1]: ", args[1]);
        // console.log(side);
        setRoomId(args[0])
        setPlayerSide(args[1])
        setGameStarted(true);
    });

    socket.on('GamePlayerName', (...args) => {
        console.log("socket.on GamePlayerName");
        console.log("GamePlayerName args: ", args);
        userInfo.username = args[0];
        setOpponent(args[1])
        if (playerSide === 'leftPlayer') {
            userInfo.username = args[1];
            setOpponent(args[0])
        }
    });

    const endGame = () => {
        console.log("socket.removeAllListeners gameState gameOver GameInfo GamePlayerName");
        socket.removeAllListeners('gameState')
        socket.removeAllListeners('gameOver')
        socket.removeAllListeners('GameInfo')
        socket.removeAllListeners('GamePlayerName')
        setGameState(({
            ballPos: { x: window_size.canvasWidth / 2, y: window_size.canvasHeight / 2 },
            ballVel: { x: 10, y: 10 },
            leftPaddle: window_size.canvasHeight / 2,
            rightPaddle: window_size.canvasHeight / 2,
            leftScore: 0,
            rightScore: 0,
        }))
    }

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        var img = new Image();
        ctx.imageSmoothingEnabled = false
        if (winner !== '') {
            console.log("drawGame winner:", winner)
            if (winner === 'leftplayer')
                img.src = "./game/left_win.jpeg"
            else
                img.src = "./game/right_win.jpeg"

            ctx.drawImage(img, 0, 0, window_size.canvasWidth, window_size.canvasHeight);
        }
        else if (opponent === '') {
            img.src = "./game/cyberpong.jpeg"

            ctx.drawImage(img, 0, 0, window_size.canvasWidth, window_size.canvasHeight);
        }
        else {
            ctx.beginPath();
            ctx.clearRect(0, 0, window_size.canvasWidth, window_size.canvasHeight);
            ctx.closePath();

            ctx.fillStyle = colorBackground;
            ctx.fillRect(0, 0, window_size.canvasWidth, window_size.canvasHeight);

            // ctx.fillRect(gameState.ballPos.x, gameState.ballPos.y, 20, 15)
            // ctx.beginPath();
            // ctx.clearRect(gameState.ballPos.x - BALL_RADIUS - 1, gameState.ballPos.y - BALL_RADIUS - 1, BALL_RADIUS * 2 + 2, BALL_RADIUS * 2 + 2);
            // ctx.closePath();

            ctx.fillStyle = colorBackground;
            ctx.arc(gameState.ballPos.x, gameState.ballPos.y, 5, 0, 2 * Math.PI)
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.arc(gameState.ballPos.x, gameState.ballPos.y, 10, 0, 2 * Math.PI)
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
            {!gameStarted ?
                <div>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="space-around"
                        style={{ minHeight: '20vh' }}
                    >
                        <Grid item xs={3}>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button onClick={() => setDifficulty("Easy")}>Easy</Button>
                                <Button onClick={() => setDifficulty("Normal")}>Normal</Button>
                                <Button onClick={() => setDifficulty("Hard")}>Hard</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button style={{ backgroundColor: "white", color: "black" }} onClick={() => setColorBackground("white")}>White</Button>
                                <Button style={{ backgroundColor: "blue", color: "black" }} onClick={() => setColorBackground("blue")}>Blue</Button>
                                <Button style={{ backgroundColor: "purple", color: "black" }} onClick={() => setColorBackground("purple")}>purple</Button>
                                <Button style={{ backgroundColor: "orange", color: "black" }} onClick={() => setColorBackground("orange")}>orange</Button>
                                <Button style={{ backgroundColor: "yellow", color: "black" }} onClick={() => setColorBackground("yellow")}>Yellow</Button>
                            </ButtonGroup>
                        </Grid>
                        Background color selected :
                        <div style={{ backgroundColor: colorBackground }}>
                            {colorBackground}
                        </div>
                        Difficulty {difficulty}
                        <Grid item xs={6}>

                            <div>
                                <div className='gamePong' tabIndex={0} onKeyDown={onKeyDownHandler}>
                                    <Canvas ref={canvasRef} draw={drawGame} width={window_size.canvasWidth} height={window_size.canvasHeight} />

                                </div>
                                {opponent ?
                                    <ColumnGroupingTable side={playerSide} username={userInfo.username} opponent={opponent} />
                                    :
                                    null
                                }
                            </div>
                        </Grid>

                        <Grid
                            rowSpacing={10}
                        >
                            <Button variant="outlined" onClick={handleClick}>
                                {winner === '' ? (
                                    <div>
                                        Search an opponent
                                    </div>
                                ) : (
                                    <div>
                                        Restart Game
                                    </div>
                                )}
                            </Button>
                        </Grid>
                        <ResponsiveDialog />
                    </Grid>
                </div>
                :
                <div>
                    {!opponent ? (
                        <Grid
                            container
                            rowSpacing={10}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '100vh' }}
                        >
                            {/* <CircularProgress size={window_size.canvasWidth / 6} /> */}
                            <Grid item xs={3}>
                                {searchOpponent}
                            </Grid>
                        </Grid>
                    ) : (
                        <div>
                            <div className='gamePong' tabIndex={0} onKeyDown={onKeyDownHandler}>
                                <Canvas ref={canvasRef} draw={drawGame} width={window_size.canvasWidth} height={window_size.canvasHeight} />

                            </div>
                            <ColumnGroupingTable side={playerSide} username={userInfo.username} opponent={opponent} />
                        </div>

                    )}
                </div>
            }
        </div>
    );
}