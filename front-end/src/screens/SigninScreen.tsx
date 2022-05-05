import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import Copyright from "../components/Copyright";

import { SyntheticEvent, useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store'
import { UserState } from "../redux/reducers/userReducers";
// import { login } from '../redux/actions/userActions';

const theme = createTheme();

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();
  // const dispatch = useDispatch()
  // const userLogin = useSelector<RootState, UserState>(
  //     (state: RootState) => state.userLogin
  // )
  // const { userInfo } = userLogin
  // useEffect(() => {
  //     if (userInfo !== undefined && userInfo.firstName) {
  //         navigate('/home');
  //     }
  // }, [userInfo, navigate])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // dispatch(login(username, password))

    console.log("TOUT MARCHE SUPER BIEN", {
      username: username,
      password: password,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Pseudo"
              name="pseudo"
              autoComplete="pseudo"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid>
              <LinkRoute to="/signup">Don't have an account? Sign Up</LinkRoute>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
