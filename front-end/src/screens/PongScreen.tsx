import { useEffect, useRef, useState } from "react";
import { GameState, PADDLE_HEIGTH, PADDLE_WIDTH } from "../type/pongType";
// import socketio from "socket.io-client";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import Canvas from "../components/Canvas";
import "../styles/gameStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
// import { URL_test } from '../constants/url';
import { ColumnGroupingTable } from "../components/ColumnGroupingTable";
import { ResponsiveDialog } from "../components/ResponsiveDialog";
// import Canvas from '../components/Canvas';
import { useLocation } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import pongSocketService from "../services/pongSocketService";
import { updateAction } from "../redux/actions/userActions";
// import { clearInterval } from 'timers';

// export const socket = socketio(`${URL_test}`, { path: '/pongSocketServer' });

const window_size = {
  canvasWidth: 600,
  canvasHeight: 300,
};

export const Pong = () => {
  let socket = pongSocketService.connect();

  const [progress, setProgress] = useState(10);
  const [colorBackground, setColorBackground] = useState("white");
  const [difficulty, setDifficulty] = useState("Normal");
  const [but, setBut] = useState("5");
  const [searchOpponent, setSearchOpponent] = useState(
    "Waiting for an opponent"
  );
  // Use a ref to access the Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    ballPos: {
      x: window_size.canvasWidth / 2,
      y: window_size.canvasHeight / 2,
    },
    ballVel: { x: 10, y: 10 },
    leftPaddle: window_size.canvasHeight / 2,
    rightPaddle: window_size.canvasHeight / 2,
    leftScore: 0,
    rightScore: 0,
    roomId: "",
    leftPlayer: "",
    rightPlayer: "",
  });
  const [id, setId] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  const [rightPlayer, setRightPlayer] = useState("");
  const [leftPlayer, setLeftPlayer] = useState("");
  const [playerSide, setPlayerSide] = useState("");
  const [roomId, setRoomId] = useState("");
  const { userInfo }: UserState = userLogin;
  const { state }: any = useLocation();
  const dispatch = useDispatch();

  // console.log("Pong useLocation => state:", state)
  socket = pongSocketService.connect();

  useEffect(() => {
    console.log("333333");
    if (userInfo) {
      console.log("333333 userInfo.status", userInfo.status);

      if (userInfo.status === "looking") {
        setGameStarted(true);
      }
    }
  }, []);

  useEffect(() => {
    console.log("888888 useLocation => state:", state);
    if (userInfo && state) {
      if (state && state.spectator) {
        console.log(
          "Pong socket.emit joinPongRoom ",
          userInfo.username,
          ", friend.status",
          state.spectator
        );
        if (socket)
          socket.emit("joinPongRoom", {
            userId: userInfo.username,
            roomId: state.spectator,
          });
        setRoomId(state.spectator);
      }
      // if (state.spectator === true) {
      // setWinner('')
      // NEED real name of Opponent + realname of PlayerName
      // setOpponent('test')
    }
  }, [socket, state]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 30 ? 0 : prevProgress + 10
      );
      if (progress === 0) setSearchOpponent("Waiting for an opponent");
      else setSearchOpponent((prevProgress) => prevProgress + ".");
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  if (userLogin.showLoading || !userInfo) {
    return <h1>Loading...</h1>;
  }

  if (!socket) {
    return <h1>Loading...</h1>;
  }

  socket.on("gameState", (...args) => {
    // console.log("receive_socket_info gameState ...args", ...args);

    // console.log("socket.on gameState");
    setGameState(args[0]);
    setGameStarted(true);
    setRightPlayer(args[0].rightPlayer);
    setLeftPlayer(args[0].leftPlayer);
    setRoomId(args[0].roomId);
    if (playerSide === "") {
      if (userInfo) {
        if (userInfo.username === args[0].rightPlayer) {
          setPlayerSide("rightPlayer");
        } else if (userInfo.username === args[0].leftPlayer) {
          setPlayerSide("leftPlayer");
        } else {
          setPlayerSide("spectator");
        }
      }
    }
    // console.log(args);
    // console.log(args[0]);
    // console.log(args[0].ballPos);
    // console.log(args[0].ballPos.x);
    // console.log(args[0].ballPos.y);
    // console.log("gameState", gameState);
    // console.log("playerSide", playerSide);
    // console.log("opponent", opponent);
    // console.log("args[0].roomId", args[0].roomId);
    // console.log("gameState.roomId", gameState.roomId);
    // console.log("roomId", roomId);
  });

  socket.on("gameOver", (winnerPlayer: string) => {
    console.log("socket.on gameOver");
    console.log("winnerPlayer :", winnerPlayer);
    if (winnerPlayer === "leftplayer") setWinner(leftPlayer);
    else setWinner(rightPlayer);
    setGameStarted(false);
    setPlayerSide("");
    endGame();
  });

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("onKeyDownHandler event code :", event.code);
    switch (event.code) {
      case "KeyS" || "ArrowDown":
        console.log(
          "socket.emit -1 playerSide :",
          playerSide,
          "roomId:",
          roomId
        );
        socket?.emit("move", { room: roomId, player: playerSide, move: 1 });
        setId(id + 1);
        break;
      case "KeyW" || "ArrowUp":
        console.log(
          "socket.emit +1 playerSide :",
          playerSide,
          "roomId:",
          roomId
        );
        socket?.emit("move", { room: roomId, player: playerSide, move: -1 });
        setId(id + 1);
        break;
    }
  };

  function stopSearchingOpponent() {
    if (userInfo) {
      if (socket) socket.emit("iDontWannaPlayAnymore", userInfo.id);
    }
    setGameStarted(false);
  }

  function giveUpPong() {
    if (userInfo) {
      console.log(
        "giveUpPong socket.emit move ZERO roomId",
        roomId,
        "player:",
        playerSide
      );
      if (socket)
        socket.emit("move", { room: roomId, player: playerSide, move: 0 });
    }
  }

  function handleClick() {
    if (userInfo) {
      console.log("socket.emit lookingForAGame / userInfo.id: ", userInfo.id);
      if (socket)
        socket.emit("lookingForAGame", {
          userId: userInfo.id,
          difficulty: difficulty,
          maxScore: parseInt(but),
        });
      dispatch(
        updateAction(
          userInfo.firstname,
          userInfo.lastname,
          userInfo.username,
          userInfo.id,
          userInfo.avatar,
          "looking",
          userInfo.access_token,
          userInfo.friends
        )
      );
    }

    // console.log("HANDKE CKUC")
    setGameStarted(true);
    setWinner("");
    setLeftPlayer("");
    setRightPlayer("");
  }

  const endGame = () => {
    console.log(
      "socket.removeAllListeners gameState gameOver GameInfo GamePlayersName"
    );
    socket?.removeAllListeners("gameState");
    socket?.removeAllListeners("gameOver");
    socket?.removeAllListeners("GameInfo");
    socket?.removeAllListeners("GamePlayersName");
    setGameState({
      ballPos: {
        x: window_size.canvasWidth / 2,
        y: window_size.canvasHeight / 2,
      },
      ballVel: { x: 10, y: 10 },
      leftPaddle: window_size.canvasHeight / 2,
      rightPaddle: window_size.canvasHeight / 2,
      leftScore: 0,
      rightScore: 0,
      roomId: roomId,
      leftPlayer: leftPlayer,
      rightPlayer: rightPlayer,
    });
  };

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    // console.log("drawGame gameState", gameState);
    // console.log("drawGame roomId", roomId);
    var img = new Image();
    ctx.imageSmoothingEnabled = false;
    if (winner !== "") {
      console.log("drawGame winner:", winner);
      if (winner === "leftplayer") img.src = "./game/left_win.jpeg";
      else img.src = "./game/right_win.jpeg";

      ctx.drawImage(
        img,
        0,
        0,
        window_size.canvasWidth,
        window_size.canvasHeight
      );
    } else if (playerSide === "") {
      img.src = "./game/cyberpong.jpeg";

      ctx.drawImage(
        img,
        0,
        0,
        window_size.canvasWidth,
        window_size.canvasHeight
      );
    } else {
      ctx.beginPath();
      ctx.clearRect(0, 0, window_size.canvasWidth, window_size.canvasHeight);
      ctx.closePath();

      ctx.fillStyle = colorBackground;
      ctx.fillRect(0, 0, window_size.canvasWidth, window_size.canvasHeight);

      ctx.fillStyle = colorBackground;
      ctx.arc(gameState.ballPos.x, gameState.ballPos.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.arc(gameState.ballPos.x, gameState.ballPos.y, 10, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "green";
      ctx.fillRect(
        0,
        gameState.leftPaddle - PADDLE_HEIGTH / 2,
        PADDLE_WIDTH,
        PADDLE_HEIGTH
      );

      ctx.fillStyle = "red";
      ctx.fillRect(
        window_size.canvasWidth - PADDLE_WIDTH,
        gameState.rightPaddle - PADDLE_HEIGTH / 2,
        PADDLE_WIDTH,
        PADDLE_HEIGTH
      );

      ctx.fillStyle = "black";
      ctx.font = "16px Palantino";
      ctx.fillText(
        gameState.rightScore.toString(),
        window_size.canvasWidth - 100,
        50
      );

      ctx.fillStyle = "black";
      ctx.fillText(gameState.leftScore.toString(), 100, 50);

      ctx.stroke();
    }
  };

  return (
    <div>
      {!gameStarted ? (
        <div>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-around"
            style={{ minHeight: "20vh" }}
          >
            <Grid item xs={3}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={() => setDifficulty("Easy")}>Easy</Button>
                <Button onClick={() => setDifficulty("Normal")}>Normal</Button>
                <Button onClick={() => setDifficulty("Hard")}>Hard</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={but}
                onChange={(e) => setBut(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={() => setColorBackground("white")}
                >
                  White
                </Button>
                <Button
                  style={{ backgroundColor: "blue", color: "black" }}
                  onClick={() => setColorBackground("blue")}
                >
                  Blue
                </Button>
                <Button
                  style={{ backgroundColor: "purple", color: "black" }}
                  onClick={() => setColorBackground("purple")}
                >
                  purple
                </Button>
                <Button
                  style={{ backgroundColor: "orange", color: "black" }}
                  onClick={() => setColorBackground("orange")}
                >
                  orange
                </Button>
                <Button
                  style={{ backgroundColor: "yellow", color: "black" }}
                  onClick={() => setColorBackground("yellow")}
                >
                  Yellow
                </Button>
              </ButtonGroup>
            </Grid>
            Background color selected :
            <div style={{ backgroundColor: colorBackground }}>
              {colorBackground}
            </div>
            Difficulty {difficulty}
            {winner ? <div>Winner {winner}</div> : null}
            <Grid item xs={6}>
              <div>
                <div
                  className="gamePong"
                  tabIndex={0}
                  onKeyDown={onKeyDownHandler}
                >
                  <Canvas
                    ref={canvasRef}
                    draw={drawGame}
                    width={window_size.canvasWidth}
                    height={window_size.canvasHeight}
                  />
                </div>
                {playerSide ? (
                  <ColumnGroupingTable
                    leftPlayer={leftPlayer}
                    rightPlayer={rightPlayer}
                  />
                ) : null}
              </div>
            </Grid>
            <Grid rowSpacing={10}>
              <Button variant="outlined" onClick={handleClick}>
                {winner === "" ? (
                  <div>Search for an opponent</div>
                ) : (
                  <div>Play again</div>
                )}
              </Button>
            </Grid>
            <ResponsiveDialog />
          </Grid>
        </div>
      ) : (
        <div>
          {!playerSide ? (
            <Grid
              container
              rowSpacing={10}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
            >
              <CircularProgress size={window_size.canvasWidth / 6} />
              <Grid item xs={3}>
                {searchOpponent}
              </Grid>
              <Button onClick={stopSearchingOpponent}>
                Stop searching for a Game
              </Button>
            </Grid>
          ) : (
            <div>
              {winner ? <div>Winner : {winner}</div> : null}
              <div
                className="gamePong"
                tabIndex={0}
                onKeyDown={onKeyDownHandler}
              >
                <Canvas
                  ref={canvasRef}
                  draw={drawGame}
                  width={window_size.canvasWidth}
                  height={window_size.canvasHeight}
                />
              </div>
              <ColumnGroupingTable
                leftPlayer={leftPlayer}
                rightPlayer={rightPlayer}
              />
              {/* <Button onClick={giveUpPong}>Give up</Button> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
