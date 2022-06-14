import React, { useState, useEffect, useRef } from 'react';
import { Menu, SubMenu, MenuButton, ControlledMenu, MenuItem, useMenuState, FocusableItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';

import './Maobe_Chat.css';

import socketio from "socket.io-client";
import add from '../styles/assets/add.svg';
import call from '../styles/assets/call.svg';
import explorarServidores from '../styles/assets/explorarServidores.svg';
import plus from '../styles/assets/plus.svg';
import arroba from '../styles/assets/arroba.svg';
import channel_logo from '../styles/assets/channel_logo.png';
import video from '../styles/assets/video.svg';
import audio from '../styles/assets/audio.svg';
import criarServidor from '../styles/assets/criarServidor.svg';
import fix from '../styles/assets/fix.svg';
import logoUser from '../styles/assets/logoUser.svg';
import ocupado from '../styles/assets/ocupado.svg';
import duvidas from '../styles/assets/duvidas.svg';
import gif from '../styles/assets/gif.svg';
import settings from '../styles/assets/settings.svg';
import caixaEntrada from '../styles/assets/caixaEntrada.svg';
import emote from '../styles/assets/emote.svg';
import gift from '../styles/assets/gift.svg';
import microfoneMuted from '../styles/assets/microfoneMuted.svg';
import { GetUserInfo } from "./GetUserInfo";


function JoinRoomMenu(props: any) {
	const ref = useRef(null);
	const [isOpen, setOpen] = useState(false);

	let Html_AvailableRooms = (<div></div>);
	if (props.roomsDispoToJoin !== undefined && props.roomsDispoToJoin.length > 0) {
		Html_AvailableRooms = props.roomsDispoToJoin.map((room: any, i: any) => {
			return (
				<div key={i}
					 onClick={ () => {
   						 setOpen(false);
						 props.onClick_joinRoom(room.id)
					 }}>
					<a id="messages">
   						<img src={ room.image } />
   						<label>{ room.name }</label>
   					</a>
					<hr />
				</div>
   			);
   		});
   	}
   	return (
   		<div>
   			<button ref={ref}
					className="mao-btn-join-room"
					onClick={() => {
   						setOpen(true);
   						props.onClick_getRoomsDispoToJoin()
   					}}>
   				🔗
   			</button>

   			<ControlledMenu
				state={isOpen ? 'open' : 'closed'}
				anchorRef={ref}
				onClose={() => setOpen(false)}
			>
   				{ /* ---------- */ }
   				<label> Public Rooms </label>
   				<hr />
   				<FocusableItem>
   					{({ ref }) => (
   						<div ref={ ref }>
   							{ Html_AvailableRooms }
   						</div>
   					)}
   				</FocusableItem>
   			</ControlledMenu>
   		</div>
   	);
}

function CreateRoomMenu(props: any) {
	const ref = useRef(null);
	const [isOpen, setOpen] = useState(false);
	const [disablePassword, setDisablePassword] = useState(true);

	let Html_AvailableUser = (<div></div>);
	if (props.availableUsers !== undefined && props.availableUsers.length > 0) {
		Html_AvailableUser = props.availableUsers.map((user: any, i: any) => {
			return (
				<div key={i} id="messages">
					<input type="checkbox"
						   onChange={(e) => props.onChange_selectParticipant(e, user) }
					/>
					<img src={user.avatar} />
					<label>{ user.username }</label>
				</div>
			);
		});
	}

	return (
		<div>
			<button ref={ref}
					className="mao-btn-add-room"
					onClick={() => {
						setOpen(true);
						props.onClick_getAvailableUsers()
					}}>
			</button>

			<ControlledMenu
				state={isOpen ? 'open' : 'closed'}
				anchorRef={ref}
				onClose={() => setOpen(false)}
			>
				{ /* ---------- */ }
				<label> Room Name </label>
				<FocusableItem>
					{({ ref }) => (
						<input ref={ref}
							   required
							   type="text"
							   placeholder="Name your new room"
							   value={ props.newRoomName }
							   onChange={e => props.setNewRoomName(e.target.value)} />
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<label> Room Image </label>
				<FocusableItem>
					{({ ref }) => (
						<input ref={ref}
							   required
							   type="text"
							   placeholder="Put an image url here"
							   value={ props.roomImage }
							   onChange={e => props.setRoomImage(e.target.value)} />
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<label> Room Type </label>
				<FocusableItem>
					{({ ref }) => (
						<select value={ props.roomType }
								onChange={ (e) => {
									setDisablePassword(!disablePassword);
									props.setTypeRoom(e.target.value)
								}}
								required>
							<option>public</option>
							<option>private</option>
						</select>
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<label> Password </label>
				<FocusableItem>
					{({ ref }) => (
						<input disabled={ disablePassword }
							   ref={ref}
							   type="password"
							   placeholder="Room password"
							   value={ props.password }
							   onChange={e => props.setPassword(e.target.value)}
						/>
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<label> Participants </label>
				<FocusableItem>
					{({ ref }) => (
						<div ref={ ref }>
							{ Html_AvailableUser }
						</div>
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<FocusableItem>
					{({ ref }) => (
						<button onClick={ () => {
									props.onSubmit_createRoom();
									setOpen(false);
								}}> Create Room </button>
					)}
				</FocusableItem>
			</ControlledMenu>
		</div>
	);
}

function EditRoomMenu(props: any) {
	const ref = useRef(null);
	const [isOpen, setOpen] = useState(false);
	const [disablePassword, setDisablePassword] = useState(true);

	if (props.currRoom.owner !== props.connectedUser.userId &&
		props.currRoom.admin.indexOf(props.connectedUser.userId) === -1) {
		return (<div></div>);
	}

	let Html_AvailableUser =<div></div>;
	if (props.roomAvailableUsers !== undefined) {
		Html_AvailableUser = props.roomAvailableUsers.map((user: any, i: any) => {
			return (
				<div key={i} id="room-participants">
					<input id="room-participants-input"
						type="checkbox"
						   onChange={(e) => props.onChange_selectRoomParticipant(e, user) }
					/>
					<img src={user.avatar} />
					<label>{ user.username }</label>
				</div>
			);
		});
	}

	return (
		<div>
			<a ref={ref}
			   className="mao-btn-join-room"
			   onClick={() => {
				   setOpen(true);
				   props.onClick_updateRoom(props.currRoom);
			   }}>
				<img alt="room settings" src={ settings } />
			</a>

			<ControlledMenu
				menuClassName="nope"
				state={isOpen ? 'open' : 'closed'}
				anchorRef={ref}
				onClose={() => setOpen(false)}
			>
				{ /* ---------- */ }
				<label> Room Name </label>
				<FocusableItem>
					{({ ref }) => (
						<input ref={ref}
							   className="mao-menu-input"
							   required
							   type="text"
							   placeholder="Name your new room"
							   value={ props.updateRoomName }
							   onChange={e => props.setUpdateRoomName(e.target.value)} />
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<label> Room Type </label>
				<FocusableItem>
					{({ ref }) => (
						<select value={ props.updateTypeRoom }
								onChange={ (e) => {
									setDisablePassword(!disablePassword);
									props.setUpdateTypeRoom(e.target.value)
								}}
								required>
							<option>public</option>
							<option>private</option>
						</select>
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<label> Password </label>
				<FocusableItem>
					{({ ref }) => (
						<input disabled={ disablePassword }
							   className="mao-menu-input"
							   ref={ref}
							   type="password"
							   placeholder="Room password"
							   value={ props.updatePassWord }
							   onChange={e => props.setUpdatePassword(e.target.value)}
						/>
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<label> Participants </label>
				<FocusableItem>
					{({ ref }) => (
						<div ref={ ref }>
							{ Html_AvailableUser }
						</div>
					)}
				</FocusableItem>
				<hr />

				{ /* ---------- */ }
				<FocusableItem>
					{({ ref }) => (
						<button onClick={ () => {
									props.onSubmit_updateRoom();
									setOpen(false);
								}}> Update Room </button>
					)}
				</FocusableItem>
			</ControlledMenu>
		</div>
	);
}

function LeaveRoomButton(props: any) {
	if (props.currRoom.owner === props.connectedUser.userId) {
		return (<div></div>);
	}
	return (
   		<button className="mao-btn-join-room"
				onClick={ () => { props.onClick_leaveRoom(props.currRoom.id) }}>
   			❌
   		</button>
	)
}

function RoomsPanel(props: any) {
	const rooms = props.roomsList;
	const Html_roomsList = rooms.map((room: any, i: any) => {
		return (
			<div key={i}
				 className="conversa"
				 tabIndex={1}
				 onClick={ () => { props.onClick(room.id); }}>
				<img alt="room logo" src={ room.image } />
				<a>
					{ room.name }
				</a>
				<EditRoomMenu currRoom={ room }
							  {...props} />
				<LeaveRoomButton currRoom={ room }
								 {...props} />

			</div>
		)
	});

	return (
		<div>
			<div id="search-conversa">
				<input type="text" placeholder="Looking for a chat room ?" />
			</div>

			<div id="mensagens-diretas">
				<a> Chat Rooms</a>
				<JoinRoomMenu {...props} />
				<CreateRoomMenu {...props} />
			</div>

			<hr />
			<hr />
			<hr />
			<div className="test-xibao" id="mao-room-names">
				{ Html_roomsList }
			</div>
		</div>
	);
}

function CreateRoomForm(props: any) {
	return (
		<div>
			<form action="#"
				  onSubmit={ () => {
					  props.onSubmit();
				  }}>
				<label>Room name:</label>
				<input type="text"
					   placeholder="my awesome room name"
					   value={ props.newRoomName }
					   onChange={ (e) => {
						   props.setNewRoomName(e.target.value);
					   }}
				>
				</input>
			</form>
		</div>
	);
}

function ParticipantAdminContextMenu(props: any) {
	if (props.currentRoom.owner !== props.connectedUser.userId &&
		props.currentRoom.admin.indexOf(props.connectedUser.userId) === -1) {
		return (<div></div>);
	}
	return (
		<div>
			{ /* ----- KICK ----- */ }
            <MenuItem onClick={
						  () => props.onClick_kick(props.currentUser.userId, props.currRoomId) }>
				Kick { props.currentUser.username }
			</MenuItem>
			<hr />

			{ /* ----- BAN ----- */ }
            <MenuItem onClick={
						  () => props.onClick_ban(props.currentUser.userId, props.currRoomId) }>
				Ban { props.currentUser.username }
			</MenuItem>
			<hr />

			{ /* ----- MUTE ----- */ }
            <MenuItem onClick={
						  () => props.onClick_mute(props.currentUser.userId, props.currRoomId) }>
				Mute { props.currentUser.username }
			</MenuItem>
			<hr />
		</div>
	);
}

function ParticipantContextMenu(props: any) {
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <div onContextMenu={e => {
                 e.preventDefault();
                 setAnchorPoint({ x: e.clientX, y: e.clientY });
                 toggleMenu(true);
             }}>
			<div id="messages">
				<img src={ props.currentUser.avatar } alt="" />
				<div id="column-message">
					<div id="message-send">
						<a>{ props.currentUser.username }</a>
					</div>
				</div>
			</div>

            <ControlledMenu {...menuProps} anchorPoint={anchorPoint}
                            onClose={() => toggleMenu(false)}>
				<ParticipantAdminContextMenu {...props} />

				{ /* ----- BLOCK ----- */ }
                <MenuItem onClick={
							  () => props.onClick_block(props.currentUser.userId, props.currRoomId) }>
					Block { props.currentUser.username }
				</MenuItem>
				<hr />

				{ /* ----- DIRECT MESSAGE ----- */ }
                <MenuItem onClick={
							  () => props.onClick_directMessage(props.currentUser.userId, props.currRoomId) }>
					Send Message { props.currentUser.username }
				</MenuItem>

            </ControlledMenu>
        </div >
    );
}

function ParticipantsPanel(props: any) {

	if (props.currRoomId === -1 ||
		props.roomsList === undefined || props.roomsList.length === 0) {
		return (<div></div>);
	}
	const currentRoom = props.roomsList.filter((obj: any) => obj.id === props.currRoomId)[0];
	if (currentRoom.participants === undefined) {
		return (<div></div>);
	}
	const Html_participants = currentRoom.participants.map((currentUser: any, i: any) => {
		if (currentUser === undefined) {
			return (<div></div>);
		}
		return (
			<div key={i}>
				<ParticipantContextMenu currentUser={ currentUser }
										currentRoom={ currentRoom }
										{...props} />
			</div>
		)
	});

	return (
		<div>
			<div id="profile">
				<img src="" alt="" />
				<a>Participants</a>
			</div>

			{ Html_participants }
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

function ChannelPanel(props: any) {
	return (
		<div id="left-bars">
			<img src={ logoUser } alt="User" />
			<hr />
			<img src={ channel_logo } alt="Unifil" />
			<img src={ criarServidor } alt="Unifil" />
			<hr />
			<img src={ explorarServidores } alt="Unifil" />
		</div>
	);
}

function StatusBar(props: any) {
	return (
		<div id="status">
			<div className="content-status">
				<img src={ props.connectedUser.avatar } alt="ProfilePhoto" />

				<div id="name-id">
					<a> { props.connectedUser.username }</a>
				</div>

				<div id="icons">
					<div className="icon">
						<img src={ microfoneMuted } alt="" />
					</div>

					<div className="icon">
						<img src={ audio } alt="" />
					</div>

					<div className="icon">
						<img src={ settings } alt="" />
					</div>

				</div>
			</div>

		</div>
	);
}

function RoomHeaderBar(props: any) {
	if (props.roomsList.length === 0) {
		return (<div></div>);
	}
	const currentRoom = props.roomsList.filter((obj: any) => obj.id === props.currRoomId)[0];
	return (
		<div className="top-bar">
			<div id="nome-conversa">
				<img src={ arroba } alt="" />
				<a>{ currentRoom.name } </a>
				<img src={ ocupado } alt="" />
			</div>


			<div id="buttons-bar">
				<img src={ call } alt="" />
				<img src={ video } alt="" />
				<img src={ fix } alt="" />
				<img src={ add } alt="" />
				<input type="text" placeholder="Search" />
				<img src={ caixaEntrada } alt="" />
				<img src={ duvidas } alt="" />
			</div>

		</div>
	);
}

function MessagePanel(props: any) {
	if (props.currRoomId === -1 ||
		props.roomsList === undefined || props.roomsList.length === 0) {
		return (<div></div>);
	}
	const currentRoom = props.roomsList.filter((obj: any) => obj.id === props.currRoomId)[0];

	let Html_messages = (<div></div>);
	if (props.messages !== undefined && props.messages.length !== 0 &&
		props.messages.get(props.currRoomId) !== undefined) {
		const currMessages = props.messages.get(props.currRoomId);
		if (currMessages.length > 0) {
			Html_messages = currMessages.map((message: any, i: any) => {
				let currentUser = currentRoom.participants.filter((obj: any) => obj.userId === message.userId)[0];
				if (currentUser === undefined) {
					currentUser = {
						'username': 'undefined',
						'avatar': ''
					};
				}
				return (
					<div key={i}>
						<div id="messages">
							<img src={ currentUser.avatar } alt="" />

							<div id="column-message">
								<div id="name-date-message">
									<a>{ currentUser.username }</a>
									<a>{ message.date }</a>
								</div>
								<div id="message-send">
									<a>{ message.content }</a>
								</div>
							</div>
						</div>
						<div id="risco">
							<hr />
							<a> ------------------- </a>
							<hr />
						</div>

					</div>
				)
			});
		}
	}
	return (
		<div id="mao-messages-panel">
			<div id="profile">
				<img src={ currentRoom.image } alt="" />
				<a>{ currentRoom.name }</a>
			</div>

			<div id="risco">
				<hr />
				<a> Lets the chat begin </a>
				<hr />
			</div>

			{ Html_messages }
		</div>
	);
}

function SendMessageBar(props: any) {
	if 	(props.messageBarValues === undefined || props.currentRoomId === -1) {
		return (<div></div>);
	}
	const currentValueBis = props.messageBarValues.get(props.currentRoomId);
	return (
		<div id="send-message" key={ props.currentRoomId }>
			<img src={ plus } alt="" />
			<form action="#"
				  onSubmit={ props.onSubmit } >
				<input type="text"
					   value={ currentValueBis }
					   placeholder="Click here to start messaging"
					   required
					   onChange={ (e) => {
						   props.onChange(e.target.value)
					   }}
				/>
			</form>
			<img src={ gift } alt="" />
			<img src={ gif } alt="" />
			<img src={ emote } alt="" />
		</div>
	);
}

interface I_Room {
	id: number,
	name: string,
	image: string,
	roomType: string,
	participants: any[];
}

interface I_Messages {
	roomId: number,
	messages: I_Message[]
}

interface I_Message {
	userId: number,
	roomId: number,
	content: string,
	createdDate: string,
	id: number,
}

interface I_LeaveRoom {
	userId: number,
	roomId: number
}

function Chat(props: any) {
	/* ------------------------------- */
	/*        Get existing rooms       */
	/* ------------------------------- */
	const [currRoomId, setCurrRoomId] = useState(-1);
	const [rooms, setRooms] = useState<any[]>([]);
	const getRooms_listener = (receivedRooms: any[]) => {
		if (receivedRooms.length === 0) {
			return ;
		}
		setCurrRoomId(receivedRooms[0].id);
		setRooms(receivedRooms);

		let sendMessageBarValues =  new Map<number, string>();
		receivedRooms.map((room: I_Room, i: any) => {
			sendMessageBarValues.set(room.id, '');
		});
		setMessageBarValue(sendMessageBarValues);
		props.appSocket.emit('F_getMessages', receivedRooms[0].id);
	}
	const onClick_Room = (roomId: number) => {
		setCurrRoomId(roomId);
	}
	useEffect(() => {
		props.appSocket.emit('F_getMessages', currRoomId);
	}, [currRoomId]);

	/* ------------------------------- */
	/*      Participants actions       */
	/* ------------------------------- */
	const onClick_kick = (userId: number, roomId: number) => {
		console.log(`Kicking ${userId} in ${roomId}`);
	}
	const onClick_ban = (userId: number, roomId: number) => {
		console.log(`Banning ${userId} in ${roomId}`);
		props.appSocket.emit('F_banUser',
							 {
								 'userId': userId,
								 'roomId': roomId
							 },
							 (isBanned: boolean) => {
								 if (isBanned === true) {
									 let newRooms = rooms.slice();
									 var index = newRooms.findIndex((obj:any) => obj.id === roomId);
									 var unbaned_participants = newRooms[index].participants.filter((obj: any) => obj.userId !== userId);
									 newRooms[index].participants = unbaned_participants;
									 setRooms(newRooms);
								 }
								 else {
									 alert('Something went wrong');
								 }
							 });
	}
	const onClick_mute = (userId: number, roomId: number) => {
		props.appSocket.emit('F_muteUser',
							 {
								 'userId': userId,
								 'roomId': roomId
							 },
							 (isMuted: boolean) => {
								 if (isMuted === true) {
									 let newRooms = rooms.slice();
									 var index = newRooms.findIndex((obj:any) => obj.id === roomId);
									 var user_index = newRooms[index].participants.findIndex((obj:any) => obj.userId === userId);
									 newRooms[index].participants[user_index]['mute'] = true;
									 setRooms(newRooms);
								 }
								 else {
									 alert('Something went wrong');
								 }
							 });

		console.log(`Muting ${userId} in ${roomId}`);
	}
	const onClick_block = (userId: number, roomId: number) => {
		props.appSocket.emit('F_blockUser',
							 {
								 'userId': userId,
								 'roomId': roomId
							 },
							 (isBlocked: boolean) => {
								 if (isBlocked === true) {
									 let newRooms = rooms.slice();
									 var index = newRooms.findIndex((obj:any) => obj.id === roomId);
									 var user_index = newRooms[index].participants.findIndex((obj:any) => obj.userId === userId);
									 var unbaned_participants = newRooms[index].participants.filter((obj: any) => obj.userId !== userId);
									 newRooms[index].participants = unbaned_participants;
									 setRooms(newRooms);

									 if (messages !== undefined) {
										 let room_message = messages.get(roomId);
										 if ( room_message!==undefined ){
											 let res = room_message.filter((obj: any) => obj.userId !== userId);
											 const newMessages = new Map(messages);
											 newMessages.set(roomId, res);
											 setMessages(newMessages);
										 };
									 }

								 }
								 else {
									 alert('Something went wrong');
								 }
							 });

		console.log(rooms, `Blocking ${userId} in ${roomId}`);
	}
	const onClick_directMessage = (userId: number, roomId: number) => {
		props.appSocket.emit('F_directMessage',
							 {
								 'userId': userId,
								 'roomId': roomId
							 },
							 (res: boolean) => {
								 if (res === true) {
									 console.log('Now let\'s chat!')
								 }
								 else {
									 console.log('sth went wring');
								 }
							 });
		console.log(`DirectMessaging ${userId} in ${roomId}`);
	}

	/* ------------------------------- */
	/*        Create new room          */
	/* ------------------------------- */
	const [newRoomName, setNewRoomName ] = useState("");
	const [typeRoom, setTypeRoom] = useState("public");
	const [passWord, setPassword] = useState("");
	const [roomImage, setRoomImage] = useState("");
	const [availableUsers, setAvailableUsers] = useState<any[]>([]);
	const onClick_getAvailableUsers = () => {
		props.appSocket.emit('F_getAvailableUsers', true);
	}
	const getAvailableUsers_listener = (userList: any) => {
		setAvailableUsers(userList);
	}
	const [selectedNewParticipants, setSelectedNewParticipants] = useState<any[]>([]);
	const onChange_selectParticipant = (e: any, user: any) => {
		if (e.currentTarget.checked) {
			let newParticipants = selectedNewParticipants.slice();
			newParticipants.push(user);
			setSelectedNewParticipants(newParticipants);
		}
		else {
			let newParticipants = selectedNewParticipants.filter((obj) => obj.userId !== user.userId);
			setSelectedNewParticipants(newParticipants);
		}
	}
	const onSubmit_createRoom = () => {
		let tmpRoomName = newRoomName;
		if (tmpRoomName.length === 0) {
			tmpRoomName = 'undefined';
		}

		const RoomToCreate = {
			'name': tmpRoomName,
			'image': roomImage,
			'typeRoom': typeRoom,
			'password': passWord,
			'users': selectedNewParticipants
		}
		console.log(RoomToCreate);
		props.appSocket.emit('F_createRoom',
							 RoomToCreate,
							 (isCreated: boolean) => {
								 if (isCreated !== true) {
									 alert('Something went wrong');
								 }
								 else {
									 setNewRoomName("");
									 setRoomImage("");
									 setTypeRoom("public");
									 setPassword("");
									 setSelectedNewParticipants([]);
								 }
							 });
		console.log("creating Room: ", newRoomName, typeRoom, passWord);
	}
	const createRoom_listener = (newRoom: I_Room) => {
		let newRooms = rooms.slice();
		newRooms.unshift(newRoom);
		setRooms(newRooms);
		setCurrRoomId(newRoom.id);

		let newMessageBarValues = new Map(messageBarValues);
		newMessageBarValues.set(newRoom.id, '');
		setMessageBarValue(newMessageBarValues);
	}

	/* ------------------------- */
	/*        Join room          */
	/* ------------------------- */
	const [roomsDispoToJoin, setRoomsDispoToJoin] = useState<any[]>([]);
	const onClick_getRoomsDispoToJoin= () => {
		props.appSocket.emit('F_getDispoRooms', true);
	}
	const getRoomsDispoToJoin_listener = (dispoRooms: I_Room[]) => {
		setRoomsDispoToJoin(dispoRooms);
	}
	const onClick_joinRoom = (roomId: number) => {
		props.appSocket.emit('F_joinRoom', roomId,
							 (isJoined: boolean) => {
								 if (isJoined !== true) {
									 alert('Something went wrong');
								 }
							 });
	}
	const joinRoom_listener = (newRoom: I_Room) => {
		let newRooms = rooms.slice();
		newRooms.unshift(newRoom);
		setRooms(newRooms);
		setCurrRoomId(newRoom.id);

		let newMessageBarValues = new Map(messageBarValues);
		newMessageBarValues.set(newRoom.id, '');
		setMessageBarValue(newMessageBarValues);
	}

	const onClick_leaveRoom = (roomId: number) => {
		props.appSocket.emit('F_leaveRoom', roomId,
							 (isLeft: boolean) => {
								 if (isLeft !== true) {
									 alert('Something went wrong');
								 }
							 });
	}
	const leaveRoom_listener = (leaveRoom: I_LeaveRoom) => {
		const tmp_newRooms = rooms.filter((obj) => obj.id !== leaveRoom.roomId);
		if (tmp_newRooms.length > 0) {
			setCurrRoomId(tmp_newRooms[0].id);
		}
		else {
			setCurrRoomId(-1);
		}
		setRooms(tmp_newRooms);
	}

	/* ------------------------------- */
	/*          Update Room            */
	/* ------------------------------- */
	const [updateRoomName, setUpdateRoomName] = useState("");
	const [updateTypeRoom, setUpdateTypeRoom] = useState("public");
	const [updatePassWord, setUpdatePassword] = useState("");
	const onClick_updateRoom = (currRoom: I_Room) => {
		props.appSocket.emit('F_getRoomAvailableUsers', currRoom.id);
		setUpdateRoomName(currRoom.name);
		setUpdateTypeRoom(currRoom.roomType);
	}

	const [roomAvailableUsers, setRoomAvailableUsers] = useState<any[]>([]);
	const [selectedNewRoomParticipants, setSelectedNewRoomParticipants] = useState<any[]>([]);
	const onChange_selectRoomParticipant = (e: any, user: any) => {
		if (e.currentTarget.checked) {
			let newParticipants = selectedNewRoomParticipants.slice();
			newParticipants.push(user);
			setSelectedNewRoomParticipants(newParticipants);
		}
		else {
			let newParticipants = selectedNewRoomParticipants.filter((obj) => obj.userId !== user.userId);
			setSelectedNewRoomParticipants(newParticipants);
		}
	}
	const getRoomAvailableUsers_listener = (userList: any) => {
		setRoomAvailableUsers(userList);
	}
	const onSubmit_updateRoom = () => {
		const tmpRoomInfos = {
			'name': updateRoomName,
			'roomId': currRoomId,
			'roomType': updateTypeRoom !== undefined ? updateTypeRoom : "public",
			'password': updatePassWord,
			'newParticipants': selectedNewRoomParticipants,
		}
		props.appSocket.emit('F_updateRoom',
							 tmpRoomInfos,
							 (isUpdated: boolean) => {
								 if (isUpdated !== true) {
									 alert('Something went wrong');
								 }
								 else {
									 setUpdateRoomName("");
									 setUpdateTypeRoom("public");
									 setUpdatePassword("");
									 setSelectedNewRoomParticipants([]);
								 }
							 });
	}
	const updateRoom_listener = (updatedRoom: I_Room) => {
		let newRooms = rooms.filter((obj: any) => obj.id !== updatedRoom.id);
		let oldRoom = rooms.filter((obj: any) => obj.id === updatedRoom.id)[0];

		updatedRoom.participants = [...oldRoom.participants, ...updatedRoom.participants]
		newRooms.unshift(updatedRoom);
		setRooms(newRooms);
	}

	/* ------------------------------- */
	/*         Messages                */
	/* ------------------------------- */
	const [messages, setMessages] = useState<Map<number, any[]>>();

	/* ------------------------------- */
	/*       Send Messages Bar         */
	/* ------------------------------- */
	const [messageBarValues, setMessageBarValue] = useState<Map<number, string>>();
	const onChange_setMessageBarValue = (value: string) => {
		if (messageBarValues !== undefined) {
			let newVarValues = new Map(messageBarValues);
			newVarValues.set(currRoomId, value);
			setMessageBarValue(newVarValues);
		}
	}
	const onSubmit_messageBar = (e: any) => {
		e.preventDefault();
		if (messageBarValues === undefined) {
			return;
		}
		let messageToCreate = {
			'roomId': currRoomId,
			'content': messageBarValues.get(currRoomId)
		}

		props.appSocket.emit('F_createMessage', messageToCreate, (isOk: boolean) => {
			if (isOk) {
				onChange_setMessageBarValue('');
			}
		});
	}

	/* ------------------------------- */
	/*       SOCKET.IO listeners       */
	/* ------------------------------- */
	useEffect(() => {
		const getMessages_listener = (newMessages: I_Messages) => {
			const messageRoomId = newMessages.roomId;
			let newVarValues = new Map(messages);
			newVarValues.set(messageRoomId, newMessages.messages);
			setMessages(newVarValues);
		}
		const createMessage_listener = (newMessageInfos: I_Message) => {
			if (messages !== undefined) {
				let intendedRoomMessages = messages.get(newMessageInfos.roomId);
				const newMessage: any = {
					'userId': newMessageInfos.userId,
					'content': newMessageInfos.content,
					'date': newMessageInfos.createdDate
				}
				if (intendedRoomMessages !== undefined) {
					intendedRoomMessages.push(newMessage);
				}
				else {
					intendedRoomMessages = [newMessage];
				}
				let newVarValues = new Map(messages);
				newVarValues.set(newMessageInfos.roomId, intendedRoomMessages);
				setMessages(newVarValues);
			}
		}

		if (props.appSocket.__callbacks === undefined ||
			props.appSocket._callbacks['getRooms_listener'] === undefined) {
			props.appSocket.on('B_getRooms', getRooms_listener);
			if (rooms.length === 0) {
				props.appSocket.emit('F_getRooms', '');
			}
		}
		if (props.appSocket._callbacks['getMessages_listener'] === undefined) {
			props.appSocket.on('B_getMessages', getMessages_listener);
		}
		if (props.appSocket._callbacks['createMessage_listener'] === undefined) {
			props.appSocket.on('B_createMessage', createMessage_listener);
		}
		if (props.appSocket._callbacks['createRoom_listener'] === undefined) {
			props.appSocket.on('B_createRoom', createRoom_listener);
		}
		if (props.appSocket._callbacks['updateRoom_listener'] === undefined) {
			props.appSocket.on('B_updateRoom', updateRoom_listener);
		}
		if (props.appSocket._callbacks['getAvailableUsers_listener'] === undefined) {
			props.appSocket.on('B_getAvailableUsers', getAvailableUsers_listener);
		}
		if (props.appSocket._callbacks['getRoomAvailableUsers_listener'] === undefined) {
			props.appSocket.on('B_getRoomAvailableUsers', getRoomAvailableUsers_listener);
		}
		if (props.appSocket._callbacks['getRoomsDispoToJoin_listener'] === undefined) {
			props.appSocket.on('B_getDispoRooms', getRoomsDispoToJoin_listener);
		}
		if (props.appSocket._callbacks['joinRoom_listener'] === undefined) {
			props.appSocket.on('B_joinRoom', joinRoom_listener);
		}
		if (props.appSocket._callbacks['leaveRoom_listener'] === undefined) {
			props.appSocket.on('B_leaveRoom', leaveRoom_listener);
		}
		return () => {
			props.appSocket.removeAllListeners('B_getRooms');
			props.appSocket.removeAllListeners('B_getMessages');
			props.appSocket.removeAllListeners('B_createMessage');
			props.appSocket.removeAllListeners('B_createRoom');
			props.appSocket.removeAllListeners('B_updateRoom');
			props.appSocket.removeAllListeners('B_getAvailableUsers');
			props.appSocket.removeAllListeners('B_getRoomAvailableUsers');
			props.appSocket.removeAllListeners('B_getDispoRooms');
			props.appSocket.removeAllListeners('B_joinRoom');
			props.appSocket.removeAllListeners('B_leaveRoom');
		};
 	});

	useEffect(() => {
		props.appSocket.emit('F_getRooms', '', (isOk: boolean) => {
			if (isOk === false) {
				alert('Something went wrong during event \'F_getRooms\'');
			}
		});
	}, []);

	/* ------------------------------- */
	/*         Component HTML          */
	/* ------------------------------- */
	return (
		<div>
			<div className="container">
				<ChannelPanel />

				<div id="middle-box">
					<RoomsPanel roomsList={ rooms }
								onClick={ onClick_Room }
								connectedUser={ props.connectedUser }

								roomsDispoToJoin={ roomsDispoToJoin }
								onClick_getRoomsDispoToJoin={ onClick_getRoomsDispoToJoin }
								onClick_joinRoom={ onClick_joinRoom }
								onSubmit_createRoom={ onSubmit_createRoom }
								newRoomName={ newRoomName }
								setNewRoomName={ setNewRoomName }
								typeRoom={ typeRoom }
								roomImage={ roomImage }
								setRoomImage={ setRoomImage }
								setTypeRoom={ setTypeRoom }
								password={ passWord }
								setPassword={ setPassword }
								availableUsers={ availableUsers }
								onClick_getAvailableUsers={ onClick_getAvailableUsers }
								onChange_selectParticipant={onChange_selectParticipant}

								updateRoomName={ updateRoomName }
								setUpdateRoomName={ setUpdateRoomName }
								updateTypeRoom={ updateTypeRoom }
								setUpdateTypeRoom={ setUpdateTypeRoom }
								updatePassWord={ updatePassWord }
								setUpdatePassword={ setUpdatePassword }
								onSubmit_updateRoom={ onSubmit_updateRoom }
								onClick_updateRoom={ onClick_updateRoom }
								roomAvailableUsers={ roomAvailableUsers }
								onChange_selectRoomParticipant={onChange_selectRoomParticipant}

								onClick_leaveRoom={ onClick_leaveRoom }
					/>
					<StatusBar connectedUser={ props.connectedUser } />
				</div>

				<div id="main">
					<RoomHeaderBar roomsList={ rooms }
                                   currRoomId={ currRoomId } />
					<div className="content">
						<MessagePanel roomsList={ rooms }
									  currRoomId={ currRoomId }
									  messages={ messages }/>
						<SendMessageBar messageBarValues={ messageBarValues }
										currentRoomId={ currRoomId }
										onChange={ onChange_setMessageBarValue }
										onSubmit={ onSubmit_messageBar } />
					</div>
				</div>
				<div id="main">
					<div className="content">
						<ParticipantsPanel roomsList={ rooms }
										   currRoomId={ currRoomId }
										   connectedUser={ props.connectedUser }
										   onClick_kick={ onClick_kick  }
										   onClick_ban={ onClick_ban  }
										   onClick_mute={ onClick_mute  }
										   onClick_block={ onClick_block  }
										   onClick_directMessage={ onClick_directMessage  }
						/>
					</div>
				</div>
			</div>



		</div>
	)
}

function Maobe_Chat() {
	const userInfo = GetUserInfo();
	if (userInfo === undefined) {
		return (<div></div>);
	}
	const socket = socketio('http://localhost:3000',
							{
								extraHeaders: {
									'Authorization':  `Bearer ${userInfo.access_token}`,
									'userId': userInfo.id,
								}}
						   );

	const connectedUser = {
		'userId': userInfo.id,
		'username': userInfo.username,
		'avatar': userInfo.avatar
	}

	return (
		<div className="App">
			<Chat appSocket={ socket }
				  connectedUser={ connectedUser } />
		</div>
	);
}

export default Maobe_Chat;
