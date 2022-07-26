import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import pongSocketService from "../services/pongSocketService";

export const JoinPongRoom = () => {
  const navigate = useNavigate();

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { id } = useParams();
  const { userInfo }: UserState = userLogin

  const socket = pongSocketService.connect();

    useEffect(() => {

        navigate("/pong")
        socket.emit('joinPongRoom', { userId: userInfo?.id, roomId: id });
        // navigate("/pong", { state: { joingame: id } })
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
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