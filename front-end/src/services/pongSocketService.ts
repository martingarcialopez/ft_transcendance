import { DefaultEventsMap } from "@socket.io/component-emitter";
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
            console.log('in PONG SOCKET SERVER IMPLEMENTATION... connection is')
            console.log(this.connection)
        
        } else {

            console.log('RETURNING EXISTING CONNECTION')

            return this.connection;            
        }
    }
}

const pongSocketService = new pongSocketServiceImplementation();


export default pongSocketService;