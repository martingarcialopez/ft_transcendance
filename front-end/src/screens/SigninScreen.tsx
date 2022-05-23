import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Copyright from "../components/Copyright";

import { SyntheticEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { UserState } from '../redux/reducers/userReducers';
import { changePageAction, loginAction } from '../redux/actions/userActions';
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme();

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [open, setOpen] = useState(true);
  const [errorFromBack, setErrorFromBack]: any = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )
  const { userInfo } = userLogin
  useEffect(() => {
    console.log("signin userInfo :")
    console.log(userInfo);
    if (userInfo !== undefined && userInfo.firstname) {
      navigate('/home');
    }
  }, [userInfo, navigate])

  const validate = () => {
    let temp = { ...errors }
    temp.username = username ? "" : "This field is required."
    temp.password = password ? "" : "This field is required."
    setErrors({
      ...temp
    })
  }

  const twoCalls = (function1: any, value: React.SetStateAction<string>, function2: any, value2: any) => {
    function1(value);
    function2(value2);
  }

  const handleChangePage = async () => {
    dispatch(changePageAction())
    navigate("/signup")
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    validate();
    setOpen(true);
    if (!errors.password && !errors.username) {
      dispatch(loginAction(username, password, navigate))

      console.log("signin TOUT MARCHE SUPER BIEN", {
        username: username,
        password: password,
      });
    }
    else {
      console.log("sign in voici les errors", {
        Errorusername: errors.username,
        Errorpassword: errors.password,
        username: username,
        password: password,
      });
    }
    // console.log("sign fin de handle")
    // console.log(store.getState())
  };

  useEffect(() => {
    console.log("useEffect userLogin")
    setErrorFromBack(userLogin.errorMessage)
  }, [userLogin.errorMessage])

  useEffect(() => {
    if (!errors.password && !errors.username && !userLogin.errorMessage)
      setErrorFromBack()
    }, [userLogin, errors])

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
          {errorFromBack ?
            <Collapse in={open}>
              <Alert
                variant="outlined"
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {errorFromBack}
              </Alert>
            </Collapse>
            :
            null
          }
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
              onChange={(e) => twoCalls(setUsername, (e.target.value), setErrors, ({ ...errors, username: '' }))}
              error={errors.username ? true : false}
              helperText={errors.username}
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
              onChange={(e) => twoCalls(setPassword, (e.target.value), setErrors, ({ ...errors, password: '' }))}
              error={errors.password ? true : false}
              helperText={errors.password}
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
              <Button onClick={handleChangePage}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
