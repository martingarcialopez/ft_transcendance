import "../styles/profileContainerStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserInfoAction } from "../redux/actions/userActions";
import { ProfilePage } from "../components/ProfilePage";

export const OtherProfileScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("id:", id)
    //   const userLogin = //Function from Martin to have all user informations
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )
    console.log("userLogin Profile:", userLogin )

    useEffect(() => {
        if (userLogin && userLogin.userInfo )
        dispatch(getUserInfoAction(id, userLogin.userInfo.access_token, navigate))
    }, [dispatch, id, userLogin, navigate])

    const { friendInfo }: UserState = userLogin;

    if (!friendInfo) {
        return <h1>Loading...</h1>;
    }

    return (
        <ProfilePage userInfo={friendInfo}/>
    );
};