import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login42Action } from "../redux/actions/userActions";

export const RedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("RedirectPage window.location.href", window.location.href)

    let code = window.location.href.slice(35, window.location.href.length);
    console.log("RedirectPage code", code)
    dispatch(login42Action(code, navigate))
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