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

export const ListFriends = ({ userPageInfo }: any) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [buttonFriend, setButtonFriend] = useState('')
    const friendId = !id ? true : false

    const navigate = useNavigate();
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )

    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.friends && userInfo.friends.find(friend => friend.username === userPageInfo.username)) {
            setButtonFriend("REMOVE FRIEND")
        }
        else {
            setButtonFriend("ADD FRIEND")
        }
    }, [userInfo, userPageInfo])

    useEffect(() => {
        dispatch(getFriendListStatusAction(userInfo?.access_token, userPageInfo.username, friendId))
    }, [dispatch, friendId, userInfo?.access_token, userPageInfo.username])

    const handleClick = (friend: any) => {
        if (friend.status !== "online" && friend.status !== "looking" && friend.status !== "offline") {
            if (userInfo) {
                navigate("/pong", { state: { spectator: friend.status } })
            }
        }
        else {
            navigate(`/profile/${friend.username}`)
        }
    }

    if (!userLogin || !userLogin.userInfo)
        return <h1>Loading...</h1>;

    const AddFriend = () => {
        if (userInfo && buttonFriend === "ADD FRIEND") {
            dispatch(addFriendAction(userPageInfo.username, userInfo))
            setButtonFriend("REMOVE FRIEND")
        }
        else if (userInfo) {
            dispatch(removeFriendAction(userPageInfo.username, userInfo))
            setButtonFriend("ADD FRIEND")
        }
    }

    return (
        <div>
            <RiGroupLine className="followerIcon" />
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
                                {item.status === "online" || item.status === "looking" ?
                                    <StyledBadgeGreen
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar src={item.avatar}>
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
                                            <Avatar src={item.avatar}>
                                                {item.username}
                                            </Avatar>
                                        </StyledBadgeRed>
                                        :
                                        <StyledBadgeGrey
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar src={item.avatar}>
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