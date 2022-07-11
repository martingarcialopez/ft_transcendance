import { useSelector } from "react-redux";
import socketio, { Socket } from "socket.io-client";
import { URL_test } from "../constants/url";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";

class pongSocketServiceImplementation {

    private connection: Socket | null;

    constructor() {
        this.connection = null;
    }

    connect() {

        const userLogin: UserState = useSelector<RootState, UserState>(
            (state: RootState) => state.userLogin
        )
        const { userInfo }: UserState = userLogin;

        console.log("pongSocketServiceImplementation userInfo", userInfo)
        console.log("pongSocketServiceImplementation userInfo.username", userInfo?.username)

        if (!this.connection) {

            this.connection = socketio(`${URL_test}`, { path: '/pongSocketServer' });

        } else {

            return this.connection;
        }
    }
}


const pongSocketService = new pongSocketServiceImplementation();

export default pongSocketService;