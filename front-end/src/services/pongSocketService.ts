import socketio, { Socket } from "socket.io-client";
import { URL_test } from "../constants/url";

class pongSocketServiceImplementation {

    private connection: Socket | null;

    constructor() {

        this.connection = null;

            const storage = localStorage.getItem('userInfo')
            if (!storage)
                return;
            const user = JSON.parse(storage);
            user.status = 'online';
            localStorage.setItem('userInfo', JSON.stringify(user));
    }

    connect() {

        if (!this.connection) {

            this.connection = socketio(`${URL_test}`, { path: '/pongSocketServer' });
            // if (this.connection)
            //     console.log('successfully connected to the socket server');
            // else
            //     console.log('something went wrong when connecting to the socket server');

            const storage = localStorage.getItem('userInfo')
            if (!storage)
                return this.connection;

            const user = JSON.parse(storage);

            this.connection.emit('setSocketId', user.username);

            // console.log(`OPENING A CONNECTION FOR USER ${user.username} with socketId ${this.connection.id}... this.connection is ${this.connection}`)

            return this.connection;

        } else {

            return this.connection;
        }
    }
}


const pongSocketService = new pongSocketServiceImplementation();

export default pongSocketService;