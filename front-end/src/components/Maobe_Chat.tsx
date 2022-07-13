import { useState, useEffect } from "react";

import "./Maobe_Chat.css";

import { RoomHeaderBar } from "./RoomHeaderBar";
import { StatusBar } from "./StatusBar";
import { ChannelPanel } from "./ChannelPanel";
import { MessagePanel } from "./MessagePanel";
import { SendMessageBar } from "./SendMessageBar";
import { ParticipantsPanel } from "./ParticipantsPanel";
import { RoomsPanel } from "./RoomsPanel";


interface I_Room {
	id: number;
	name: string;
	image: string;
	roomType: string;
	participants: any[];
}

interface I_Messages {
	roomId: number;
	messages: I_Message[];
}

interface I_Message {
	userId: number;
	roomId: number;
	content: string;
	createdDate: string;
	id: number;
}

interface I_LeaveRoom {
	userId: number;
	roomId: number;
}


export function Chat(props: any) {
	/* ------------------------------- */
	/*        Get existing rooms       */
	/* ------------------------------- */
	const [currRoomId, setCurrRoomId] = useState(-1);
	const [rooms, setRooms] = useState<any[]>([]);
	const getRooms_listener = (receivedRooms: any[]) => {
		if (receivedRooms.length === 0) {
			return;
		}
		if (currRoomId === -1) {
			setCurrRoomId(receivedRooms[0].id);
		}
		setRooms(receivedRooms);

		if (messageBarValues && currRoomId !== undefined) {
			const currMessageBarValue = messageBarValues.get(currRoomId);
			if (
				currMessageBarValue !== undefined &&
					currMessageBarValue.length === 0
			) {
				let sendMessageBarValues = new Map<number, string>();
				receivedRooms.map((room: I_Room, i: any) => {
					sendMessageBarValues.set(room.id, "");
					return null;
				});
				setMessageBarValue(sendMessageBarValues);
			}
		} else {
			let sendMessageBarValues = new Map<number, string>();
			receivedRooms.map((room: I_Room, i: any) => {
				sendMessageBarValues.set(room.id, "");
				return null;
			});
			setMessageBarValue(sendMessageBarValues);
		}
		props.appSocket.emit("F_getMessages", receivedRooms[0].id);
	};
	const onClick_Room = (roomId: number) => {
		setCurrRoomId(roomId);
	};
	useEffect(() => {
		props.appSocket.emit("F_getMessages", currRoomId);
	}, [currRoomId, props.appSocket]);


	/* ------------------------------- */
	/*        Create new room          */
	/* ------------------------------- */
	const [newRoomName, setNewRoomName] = useState("");
	const [typeRoom, setTypeRoom] = useState("public");
	const [passWord, setPassword] = useState("");
	const [roomImage, setRoomImage] = useState("");
	const [availableUsers, setAvailableUsers] = useState<any[]>([]);
	const onClick_getAvailableUsers = () => {
		props.appSocket.emit("F_getAvailableUsers", true);
	};
	const getAvailableUsers_listener = (userList: any) => {
		setAvailableUsers(userList);
	};
	const [selectedNewParticipants, setSelectedNewParticipants] = useState<any[]>(
		[]
	);
	const onChange_selectParticipant = (e: any, user: any) => {
		if (e.currentTarget.checked) {
			let newParticipants = selectedNewParticipants.slice();
			newParticipants.push(user);
			setSelectedNewParticipants(newParticipants);
		} else {
			let newParticipants = selectedNewParticipants.filter(
				(obj) => obj.userId !== user.userId
			);
			setSelectedNewParticipants(newParticipants);
		}
	};
	const onSubmit_createRoom = () => {
		let tmpRoomName = newRoomName;
		if (tmpRoomName.length === 0) {
			tmpRoomName = "undefined";
		}

		const RoomToCreate = {
			name: tmpRoomName,
			image: roomImage,
			typeRoom: typeRoom,
			password: passWord,
			users: selectedNewParticipants,
		};
		console.log(RoomToCreate);
		props.appSocket.emit("F_createRoom", RoomToCreate, (isCreated: boolean) => {
			if (isCreated !== true) {
				alert("Something went wrong");
			} else {
				setNewRoomName("");
				setRoomImage("");
				setTypeRoom("public");
				setPassword("");
				setSelectedNewParticipants([]);
			}
		});
	};
	const createRoom_listener = (newRoom: I_Room) => {
		let newRooms = rooms.slice();

		let tmpNewParticipants: any = [];
		if (newRoom.participants.length > 0) {
			newRoom.participants.forEach((tmp_user) => {
				tmpNewParticipants.push({
					userId: tmp_user.id,
					username: tmp_user.username,
					avatar: tmp_user.avatar,
				});
			});
			newRoom.participants = tmpNewParticipants;
		}

		newRooms.unshift(newRoom);
		setRooms(newRooms);
		setCurrRoomId(newRoom.id);

		let newMessageBarValues = new Map(messageBarValues);
		newMessageBarValues.set(newRoom.id, "");
		setMessageBarValue(newMessageBarValues);
	};

	/* ------------------------- */
	/*        Join room          */
	/* ------------------------- */
	const [roomsDispoToJoin, setRoomsDispoToJoin] = useState<any[]>([]);
	const onClick_getRoomsDispoToJoin = () => {
		props.appSocket.emit("F_getDispoRooms", true);
	};
	const getRoomsDispoToJoin_listener = (dispoRooms: I_Room[]) => {
		setRoomsDispoToJoin(dispoRooms);
	};
	const onSubmit_joinRoom = (
		roomId: number,
		password: string,
		isProtected: boolean
	) => {
		console.log(roomId, password, isProtected);
		props.appSocket.emit(
			"F_joinRoom",
			{
				roomId: roomId,
				password: password,
				isProtected: isProtected,
			},
			(isJoined: boolean) => {
				if (isJoined !== true) {
					alert("Invalid Password");
				}
			}
		);
	};
	const joinRoom_listener = (newRoom: I_Room) => {
		let newRooms = rooms.slice();
		newRooms.unshift(newRoom);
		setRooms(newRooms);
		setCurrRoomId(newRoom.id);

		let newMessageBarValues = new Map(messageBarValues);
		newMessageBarValues.set(newRoom.id, "");
		setMessageBarValue(newMessageBarValues);
	};

	const onClick_leaveRoom = (roomId: number) => {
		props.appSocket.emit("F_leaveRoom", roomId, (isLeft: boolean) => {
			if (isLeft !== true) {
				alert("Something went wrong");
			}
		});
	};
	const leaveRoom_listener = (leaveRoom: I_LeaveRoom) => {
		const tmp_newRooms = rooms.filter((obj) => obj.id !== leaveRoom.roomId);
		if (tmp_newRooms.length > 0) {
			setCurrRoomId(tmp_newRooms[0].id);
		} else {
			setCurrRoomId(-1);
		}
		setRooms(tmp_newRooms);
	};

	/* ------------------------------- */
	/*          Update Room            */
	/* ------------------------------- */
	const [updateRoomName, setUpdateRoomName] = useState("");
	const [updateTypeRoom, setUpdateTypeRoom] = useState("public");
	const [updatePassWord, setUpdatePassword] = useState("");
	const onClick_updateRoom = (currRoom: I_Room) => {
		props.appSocket.emit("F_getRoomAvailableUsers", currRoom.id);
		setUpdateRoomName(currRoom.name);
		setUpdateTypeRoom(currRoom.roomType);
	};

	const [roomAvailableUsers, setRoomAvailableUsers] = useState<any[]>([]);
	const [selectedNewRoomParticipants, setSelectedNewRoomParticipants] =
		useState<any[]>([]);
	const onChange_selectRoomParticipant = (e: any, user: any) => {
		if (e.currentTarget.checked) {
			let newParticipants = selectedNewRoomParticipants.slice();
			newParticipants.push(user);
			setSelectedNewRoomParticipants(newParticipants);
		} else {
			let newParticipants = selectedNewRoomParticipants.filter(
				(obj) => obj.userId !== user.userId
			);
			setSelectedNewRoomParticipants(newParticipants);
		}
	};
	const getRoomAvailableUsers_listener = (userList: any) => {
		setRoomAvailableUsers(userList);
	};
	const onSubmit_updateRoom = () => {
		const tmpRoomInfos = {
			name: updateRoomName,
			roomId: currRoomId,
			roomType: updateTypeRoom !== undefined ? updateTypeRoom : "public",
			password: updatePassWord,
			newParticipants: selectedNewRoomParticipants,
		};
		props.appSocket.emit("F_updateRoom", tmpRoomInfos, (isUpdated: boolean) => {
			if (isUpdated !== true) {
				alert("Something went wrong");
			} else {
				setUpdateRoomName("");
				setUpdateTypeRoom("public");
				setUpdatePassword("");
				setSelectedNewRoomParticipants([]);
			}
		});
	};
	const updateRoom_listener = (updatedRoom: I_Room) => {
		let newRooms = rooms.filter((obj: any) => obj.id !== updatedRoom.id);
		let oldRoom = rooms.filter((obj: any) => obj.id === updatedRoom.id)[0];

		let tmpNewParticipants: any = [];
		if (updatedRoom.participants.length > 0) {
			updatedRoom.participants.forEach((tmp_user) => {
				tmpNewParticipants.push({
					userId: tmp_user.id,
					username: tmp_user.username,
					avatar: tmp_user.avatar,
				});
			});
		}
		updatedRoom.participants = [...oldRoom.participants, ...tmpNewParticipants];
		newRooms.unshift(updatedRoom);
		setRooms(newRooms);
	};

	/* ------------------------------- */
	/*         Messages                */
	/* ------------------------------- */
	const [messages, setMessages] = useState<Map<number, any[]>>();

	/* ------------------------------- */
	/*       Send Messages Bar         */
	/* ------------------------------- */
	const [messageBarValues, setMessageBarValue] =
		useState<Map<number, string>>();

	/* ------------------------------- */
	/*       SOCKET.IO listeners       */
	/* ------------------------------- */
	useEffect(() => {
		const getMessages_listener = (newMessages: I_Messages) => {
			const messageRoomId = newMessages.roomId;
			let newVarValues = new Map(messages);
			newVarValues.set(messageRoomId, newMessages.messages);
			if (newVarValues !== messages) {
				setMessages(newVarValues);
			}
		};
		const createMessage_listener = (newMessageInfos: I_Message) => {
			if (messages !== undefined) {
				let intendedRoomMessages = messages.get(newMessageInfos.roomId);
				const newMessage: any = {
					userId: newMessageInfos.userId,
					content: newMessageInfos.content,
					createdDate: newMessageInfos.createdDate,
				};
				if (intendedRoomMessages !== undefined) {
					intendedRoomMessages.push(newMessage);
				} else {
					intendedRoomMessages = [newMessage];
				}
				let newVarValues = new Map(messages);
				newVarValues.set(newMessageInfos.roomId, intendedRoomMessages);
				setMessages(newVarValues);
			}
		};

		if (
			props.appSocket.__callbacks === undefined ||
				props.appSocket._callbacks["getRooms_listener"] === undefined
		) {
			props.appSocket.on("B_getRooms", getRooms_listener);
			if (rooms.length === 0) {
				props.appSocket.emit("F_getRooms", "");
			}
		}
		if (props.appSocket._callbacks["getMessages_listener"] === undefined) {
			props.appSocket.on("B_getMessages", getMessages_listener);
		}
		if (props.appSocket._callbacks["createMessage_listener"] === undefined) {
			props.appSocket.on("B_createMessage", createMessage_listener);
		}
		if (props.appSocket._callbacks["createRoom_listener"] === undefined) {
			props.appSocket.on("B_createRoom", createRoom_listener);
		}
		if (props.appSocket._callbacks["updateRoom_listener"] === undefined) {
			props.appSocket.on("B_updateRoom", updateRoom_listener);
		}
		if (
			props.appSocket._callbacks["getAvailableUsers_listener"] === undefined
		) {
			props.appSocket.on("B_getAvailableUsers", getAvailableUsers_listener);
		}
		if (
			props.appSocket._callbacks["getRoomAvailableUsers_listener"] === undefined
		) {
			props.appSocket.on(
				"B_getRoomAvailableUsers",
				getRoomAvailableUsers_listener
			);
		}
		if (
			props.appSocket._callbacks["getRoomsDispoToJoin_listener"] === undefined
		) {
			props.appSocket.on("B_getDispoRooms", getRoomsDispoToJoin_listener);
		}
		if (props.appSocket._callbacks["joinRoom_listener"] === undefined) {
			props.appSocket.on("B_joinRoom", joinRoom_listener);
		}
		if (props.appSocket._callbacks["leaveRoom_listener"] === undefined) {
			props.appSocket.on("B_leaveRoom", leaveRoom_listener);
		}
		return () => {
			props.appSocket.removeAllListeners("B_getRooms");
			props.appSocket.removeAllListeners("B_getMessages");
			props.appSocket.removeAllListeners("B_createMessage");
			props.appSocket.removeAllListeners("B_createRoom");
			props.appSocket.removeAllListeners("B_updateRoom");
			props.appSocket.removeAllListeners("B_getAvailableUsers");
			props.appSocket.removeAllListeners("B_getRoomAvailableUsers");
			props.appSocket.removeAllListeners("B_getDispoRooms");
			props.appSocket.removeAllListeners("B_joinRoom");
			props.appSocket.removeAllListeners("B_leaveRoom");
		};
	});

	useEffect(() => {
		props.appSocket.emit("F_getRooms", "", (isOk: boolean) => {
			if (isOk === false) {
				alert("Something went wrong during event 'F_getRooms'");
			}
		});
		const interval = setInterval(() => {
			props.appSocket.emit("F_getRooms", "");
		}, 1500);
		return () => clearInterval(interval);
	}, [props.appSocket]);

	/* ------------------------------- */
	/*         Component HTML          */
	/* ------------------------------- */
	return (
		<div>
			<div className="container">
			<ChannelPanel />

			<div id="middle-box">
			<RoomsPanel
		roomsList={rooms}
		onClick={onClick_Room}
		connectedUser={props.connectedUser}
		roomsDispoToJoin={roomsDispoToJoin}
		onClick_getRoomsDispoToJoin={onClick_getRoomsDispoToJoin}
		onSubmit_joinRoom={onSubmit_joinRoom}
		onSubmit_createRoom={onSubmit_createRoom}
		newRoomName={newRoomName}
		setNewRoomName={setNewRoomName}
		typeRoom={typeRoom}
		roomImage={roomImage}
		setRoomImage={setRoomImage}
		setTypeRoom={setTypeRoom}
		password={passWord}
		setPassword={setPassword}
		availableUsers={availableUsers}
		onClick_getAvailableUsers={onClick_getAvailableUsers}
		onChange_selectParticipant={onChange_selectParticipant}
		updateRoomName={updateRoomName}
		setUpdateRoomName={setUpdateRoomName}
		updateTypeRoom={updateTypeRoom}
		setUpdateTypeRoom={setUpdateTypeRoom}
		updatePassWord={updatePassWord}
		setUpdatePassword={setUpdatePassword}
		onSubmit_updateRoom={onSubmit_updateRoom}
		onClick_updateRoom={onClick_updateRoom}
		roomAvailableUsers={roomAvailableUsers}
		onChange_selectRoomParticipant={onChange_selectRoomParticipant}
		onClick_leaveRoom={onClick_leaveRoom}
			/>
			<StatusBar connectedUser={props.connectedUser} />
			</div>

			<div id="main">
			<RoomHeaderBar roomsList={rooms} currRoomId={currRoomId} />
			<div className="content">
			<MessagePanel
		roomsList={rooms}
		currRoomId={currRoomId}
		messages={messages}
			/>
			<SendMessageBar
		currRoomId={currRoomId}
		roomsList={rooms}
		messageBarValues={messageBarValues}
		setMessageBarValue={setMessageBarValue}
		{...props}
			/>
			</div>
			</div>
			<div id="main">
			<div className="content">
			<ParticipantsPanel
		roomsList={rooms}
		currRoomId={currRoomId}
		connectedUser={props.connectedUser}
		setCurrRoomId={setCurrRoomId}
		messages={messages}
		setMessages={setMessages}
		{...props}
			/>
			</div>
			</div>
			</div>
			</div>
	);
}
