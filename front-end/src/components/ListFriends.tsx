import "../styles/profileContainerStyles.css";
import { RiGroupLine } from "react-icons/ri";

import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { StyledBadgeRed, StyledBadgeGreen, StyledBadgeGrey } from "../styles/AvatarStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import { useEffect, useState } from "react";
import { addFriendAction, getFriendListStatusAction, removeFriendAction } from "../redux/actions/userActions";
import socketio from "socket.io-client";
import { URL_test } from '../constants/url';

export const socket = socketio(`${URL_test}`)

export const ListFriends = ({ userPageInfo }: any) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [buttonFriend, setButtonFriend] = useState('')
    const friendId = !id ? true : false

    const navigate = useNavigate();
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )
    console.log("ListFriends userLogin:", userLogin);
    // console.log("ListFriends userPageInfo.friends.length:", userPageInfo.friends.length);

    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo)
            console.log("0000 ListFriends userInfo.friends = ", userInfo.friends)
        console.log("ListFriends userPageInfo.username = ", userPageInfo.username)
        // if (userInfo)
        //     getFriendInfosAction(userInfo.access_token)
        if (userInfo && userInfo.friends && userInfo.friends.find(friend => friend.username === userPageInfo.username)) {
            setButtonFriend("REMOVE FRIEND")
        }
        else {
            setButtonFriend("ADD FRIEND")
        }
    }, [userInfo, userPageInfo])

    useEffect(() => {
        // console.log("11111 ListFriends userPageInfo = ", userPageInfo)
        // console.log("ListFriends userPageInfo.friends = ", userPageInfo.friends)
        if (userPageInfo && userInfo) {
            console.log("dispatch getFriendListStatusAction")
            dispatch(getFriendListStatusAction(userInfo.access_token, userPageInfo.username, friendId))
            // console.log("userLogin.friendInfo", userLogin.friendInfo)
            // if (userLogin && userLogin.friendInfo && userLogin.friendInfo.username && userLogin.friendInfo.status) {
            // }
        }

    }, [])

    const handleClick = (friend: any) => {
        if (friend.status !== "online" && friend.status !== "offline") {
            if (userInfo) {
                navigate("/pong", { state: { spectator: friend.status } })
            }
        }
        else {
            console.log("id :", friend.username)
            navigate(`/profile/${friend.username}`)
        }
    }

    //Faire un check si la personne est déjà en amis changer par RETIRER DE CES AMIS.

    if (!userLogin || !userLogin.userInfo)
        return <h1>Loading...</h1>;

    const AddFriend = () => {
        console.log("ListFriends addFriend button clicked")
        console.log("ListFriends AddFriend userInfo :", userInfo)
        console.log("ListFriends AddFriend userPageInfo :", userPageInfo)
        console.log("ListFriends AddFriend buttonFriend :", buttonFriend)
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
                    <ListItem key={item.username}>
                        <Button onClick={() => handleClick(item)} >
                            <ListItemAvatar>
                                {item.status === "online" ?
                                    <StyledBadgeGreen
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar>
                                            {item.username}
                                        </Avatar>
                                    </StyledBadgeGreen>
                                    :
                                    item.status === "offline" ?

                                        <StyledBadgeRed
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar>
                                                {item.username}
                                            </Avatar>
                                        </StyledBadgeRed>
                                        :
                                        <StyledBadgeGrey
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar>
                                                {item.username}
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