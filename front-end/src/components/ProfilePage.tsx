import "../styles/profileContainerStyles.css";
import RepoCard from "../components/RepoCard";
import { ListFriends } from "../components/ListFriends";
import { Button, Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Box } from "@mui/system";
import { updateAction } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

const matchs = [
    {
        player1: 'Champomy',
        player2: 'TaCopineBonne',
        winner: 'TaCopineBonne',
        scoreLoser: 2,
        id: 0,
    },
    {
        player1: 'Champomy',
        player2: 'TaCopineBonne',
        winner: 'TaCopineBonne',
        scoreLoser: 2,
        id: 1,
    },
    {
        player1: 'Champomy',
        player2: 'TaCopineBonne',
        winner: 'TaCopineBonne',
        scoreLoser: 2,
        id: 2,
    },
];

export const ProfilePage = ({ userInfo }: any) => {
    const [firstname, setFirstname] = useState(userInfo.firstname)
    const [lastname, setLastname] = useState(userInfo.lastname)
    const [username, setUsername] = useState(userInfo.username)
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    // const ref_default_img = "/game/test/test_42.jpg"
    // const ref_default_img = "/shared/avatar/mgarcia-.png"
    const ref_default_img = "/shared/avatar/avatar_chat.jpeg"

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setOpen(false);
        if (userInfo)
            dispatch(updateAction(firstname, lastname, username, userInfo.password, userInfo.avatar, userInfo.id, userInfo.access_token))

        console.log("signUp :", {
            firstname: firstname,
            lastname: lastname,
            username: username,
        });
    }

    return (
        <div className="backgroundProfile">
            <div className="profileHeader">
                <h2>Profile</h2>
            </div>
            <div className="profileContainer">
                <aside className="sideBar">
                    {!open ?
                        <div>
                            <img src={ref_default_img}/*{userInfo.avatar}*/ alt="" className="userImage" />
                            <h1 className="userName">{userInfo.username}</h1>
                            <h3 className="userNickName">{userInfo.login42}</h3>
                            <h5 className="userNickName">{userInfo.firstname}</h5>
                            <h5 className="userNickName">{userInfo.lastname}</h5>
                            <Button onClick={handleClickOpen} >
                                Edit Profile
                            </Button>
                        </div>
                        :
                        <div>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 3 }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstname"
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="First Name"
                                            autoFocus
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastname"
                                            label="Last Name"
                                            name="lastname"
                                            autoComplete="family-name"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Pseudo"
                                            name="username"
                                            autoComplete="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Validate change
                                </Button>
                            </Box>
                        </div>
                    }
                    <ListFriends />
                </aside>
                <div className="reposContainer">
                    <p className="repoContainerTitle">Historique des matchs</p>
                    <div className="repos">
                        {matchs.map((item) => (
                            <RepoCard
                                key={item.id}
                                player1={item.player1}
                                player2={item.player2}
                                winner={item.winner}
                                scoreLoser={item.scoreLoser}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};