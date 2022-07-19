import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux";
import { login42Action } from "../redux/actions/userActions";
import { UserState } from "../redux/reducers/userReducers";
import pongSocketService from "../services/pongSocketService";

export const JoinPongRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { id } = useParams();
  const { userInfo }: UserState = userLogin

  const socket = pongSocketService.connect();

    useEffect(() => {

        console.log(`id is ${id} and user is ${userInfo?.username}`);
        
        console.log(`socket is ${socket}`);
        console.log(socket);
        navigate("/pong")
        socket.emit('joinPongRoom', { userId: userInfo?.id, roomId: id });
        // navigate("/pong", { state: { joingame: id } })

      }, [navigate])
    
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        style={{ minHeight: '20vh' }}
      >
        <CircularProgress size={100} />
      </Grid>
    </Box>
  );
};