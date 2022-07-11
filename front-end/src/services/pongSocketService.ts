import socketio, { Socket } from "socket.io-client";
import { URL_test } from "../constants/url";

class pongSocketServiceImplementation {

    private connection: Socket | null;

    constructor() {
        this.connection = null;
    }

    connect() {
        if (!this.connection) {

            this.connection = socketio(`${URL_test}`, { path: '/pongSocketServer' });
        
        } else {

            return this.connection;            
        }
    }
}


const pongSocketService = new pongSocketServiceImplementation();

export default pongSocketService;