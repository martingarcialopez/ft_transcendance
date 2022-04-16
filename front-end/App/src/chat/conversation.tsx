import React from "react";
import { bindActionCreators } from 'redux';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useForm} from 'react-hook-form';
import   * as actionCreators from "./redux/actionCreator";
import {useDispatch,  useSelector } from "react-redux";
import {RootState} from "./redux/store"
import socketio from "socket.io-client";

const ENDPOINT = "http://172.18.0.4:3000"
// const ENDPOINT = "http://ft_nestjs:3000"

const socket = socketio(ENDPOINT);

/**
 * take the message of the field text then stock into the store redux
 * add the new message in the 
 * @returns chat text form
 */


export function TextField() {
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const {ActionCreatorNewMsg} = bindActionCreators(actionCreators, dispatch)
	const state = useSelector((state: RootState) => state)

	socket.on('msgToClient', (receive:any) => {
		let newArray = [...state.message.content, receive]
		ActionCreatorNewMsg(newArray)
	})
	// socket.id = "123"
	// console.log("socket id == ", socket.id)
	return (
		<>
		<h3>Chat</h3><br></br>
			{ state.message.content.map((item:string, index:number) => <div key={index}> {item} </div>)}

			<form className="field-chat" onSubmit={handleSubmit(data => {
				socket.emit('msgToServer', data.name)
				// socket.emit('create chanel', t_chanel)
			}) } >
				<textarea placeholder="Type message.." required {...register('name') } autoComplete="on"  ></textarea>
				<button className="send-msg"  >
				<BsFillArrowUpCircleFill className="send-msg" size={60}  color="Aquamarine" />	</button>
			</form>

		</>
	);
}