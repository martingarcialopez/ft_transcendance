import "../styles/profileContainerStyles.css";
import { RiGroupLine } from "react-icons/ri";

import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { StyledBadgeRed, StyledBadgeGreen, StyledBadgeGrey } from "../styles/AvatarStyle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";

const friends = [
    {
        username: 'Lillon1',
        connected: "true"
    },
    {
        username: 'q',
        connected: "false"
    },
    {
        username: 'a',
    },
    {
        username: 'b',
        connected: "true"
    },
];

export const ListFriends = () => {
    const navigate = useNavigate();
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )
    console.log("ListFriends userLogin:", userLogin);

    const handleClick = (id: any) => {
        console.log("id :", id)
        navigate(`/profile/${id}`)
    }

    //Faire un check si la personne est déjà en amis changer par RETIRER DE CES AMIS.
    const AddFriend = () => {
        console.log("ADD FRIEND")
    }

    return (
        <div>
            {/* <p className="userDescription">{userLogin.userInfo.description}</p> */}
            <RiGroupLine className="followerIcon" />
            {/* <b>{userLogin.userInfo.followers}</b> */}
            <b>143 followers - <Button onClick={AddFriend} >Add friend</Button></b>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Friend
            </Typography>
            <List>
                {friends.map((item) => (
                    <ListItem key={item.username}>
                        <Button onClick={() => handleClick(item.username)} >
                            <ListItemAvatar>
                                {item.connected === "true" ?
                                    <StyledBadgeGreen
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar>
                                            {item.username[0]}
                                        </Avatar>
                                    </StyledBadgeGreen>
                                    :
                                    item.connected === "false" ?

                                        <StyledBadgeRed
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar>
                                                {item.username[0]}
                                            </Avatar>
                                        </StyledBadgeRed>
                                        :
                                        <StyledBadgeGrey
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar>
                                                {item.username[0]}
                                            </Avatar>
                                        </StyledBadgeGrey>
                                }
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.username}
                            />
                        </Button>
                    </ListItem>
                ))}
            </List>
            {/* {.map((follower) => {
                  <Button onClick={handleChangePage}>
                  {follower.username}
                </Button>
              })} */}
        </div>
    );
};