import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login42Action } from "../redux/actions/userActions";

export const RedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(login42Action(window.location.href.slice(35, window.location.href.length), navigate))
  }, [dispatch, navigate])

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