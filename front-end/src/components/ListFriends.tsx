import "../styles/profileContainerStyles.css";
import { RiGroupLine } from "react-icons/ri";

import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { StyledBadge } from "../styles/AvatarStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction } from "../redux/actions/userActions";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";

const friends = [
    {
        username: 'Lillon1',
    },
    {
        username: 'q',
    },
    {
        username: 'a',
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

    return (
        <div>
            {/* <p className="userDescription">{userLogin.userInfo.description}</p> */}
            <RiGroupLine className="followerIcon" />
            {/* <b>{userLogin.userInfo.followers}</b> */}
            <b>143 followers</b>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Friend
            </Typography>
            <List>
                {friends.map((item) => (
                    <ListItem key={item.username}>
                        <Button onClick={() => handleClick(item.username)} >
                            <ListItemAvatar>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar>
                                        {item.username[0]}
                                    </Avatar>
                                </StyledBadge>
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