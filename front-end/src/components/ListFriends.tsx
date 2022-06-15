import "../styles/profileContainerStyles.css";
import { RiGroupLine } from "react-icons/ri";

import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { StyledBadgeRed, StyledBadgeGreen, StyledBadgeGrey } from "../styles/AvatarStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import { useEffect, useState } from "react";
import { addFriendAction, removeFriendAction } from "../redux/actions/userActions";

// const friends = [
//     {
//         username: 'Lillon1',
//         connected: "true"
//     },
//     {
//         username: 'q',
//         connected: "false"
//     },
//     {
//         username: 'a',
//     },
//     {
//         username: 'b',
//         connected: "true"
//     },
// ];

export const ListFriends = ({ userPageInfo }: any) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [buttonFriend, setButtonFriend] = useState('')

    const navigate = useNavigate();
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )
    console.log("ListFriends userLogin:", userLogin);
    // console.log("ListFriends userPageInfo.friends.length:", userPageInfo.friends.length);
    
    const { userInfo } = userLogin;

    useEffect(() => {
        // if (userInfo)
        //     getFriendInfosAction(userInfo.access_token)
        if (userInfo && userInfo.friends && userInfo.friends.find(friend => friend === userInfo.username)) {
            setButtonFriend("REMOVE FRIEND")
        }
        else {
            setButtonFriend("ADD FRIEND")
        }
    }, [userInfo])

    const handleClick = (id: any) => {
        console.log("id :", id)
        navigate(`/profile/${id}`)
    }

    //Faire un check si la personne est déjà en amis changer par RETIRER DE CES AMIS.

    if (!userLogin || !userLogin.userInfo)
        return <h1>Loading...</h1>;

    const AddFriend = () => {
        console.log("addFriend button clicked")
        console.log("userInfo :", userInfo)
        console.log("userPageInfo :", userPageInfo)
        console.log("buttonFriend :", buttonFriend)
        if (userInfo && buttonFriend === "ADD FRIEND") {
            console.log("case 111")
            dispatch(addFriendAction(userPageInfo.username, userInfo))
            setButtonFriend("REMOVE FRIEND")
        }
        // console.log("userInfo.friends :", userInfo.friends)
        // && userInfo.friends && userInfo.friends.find(friend => friend === userInfo.username)
        else if (userInfo) {
            console.log("case 222")
            dispatch(removeFriendAction(userPageInfo.username, userInfo.access_token))
            setButtonFriend("ADD FRIEND")
        }
        // console.log("ADD FRIEND")
    }

    return (
        <div>
            {/* <p className="userDescription">{userLogin.userInfo.description}</p> */}
            <RiGroupLine className="followerIcon" />
            {/* <b>{userLogin.userInfo.followers}</b> */}
            <b>{!userPageInfo.friends ? 0 : userPageInfo.friends.length} friends -
                {id ?
                    <Button onClick={AddFriend} >{buttonFriend}</Button>
                    :
                    null
                }
            </b>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                List of friends
            </Typography>
            <List>
                {userPageInfo && userPageInfo.friends && userPageInfo.friends.map((item: any) => (
                    <ListItem key={item.id}>
                        <Button onClick={() => handleClick(item.friend_username)} >
                            <ListItemAvatar>
                                {item.connected === "true" ?
                                    <StyledBadgeGreen
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar>
                                            {item.friend_username[0]}
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
                                                {item.friend_username[0]}
                                            </Avatar>
                                        </StyledBadgeRed>
                                        :
                                        <StyledBadgeGrey
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar>
                                                {item.friend_username[0]}
                                            </Avatar>
                                        </StyledBadgeGrey>
                                }
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.friend_username}
                            />
                        </Button>
                    </ListItem>
                ))}
            </List>
            {/* {.map((follower) => {
                  <Button onClick={handleChangePage}>
                  {follower.friend_username}
                </Button>
              })} */}
        </div>
    );
};