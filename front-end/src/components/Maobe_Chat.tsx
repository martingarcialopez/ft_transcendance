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

	const [messages, setMessages] = useState<Map<number, any[]>>();

	const [messageBarValues, setMessageBarValue] =
		  useState<Map<number, string>>();

	useEffect(() => {

		if (
			props.appSocket.__callbacks === undefined ||
				props.appSocket._callbacks["getRooms_listener"] === undefined
		) {
			props.appSocket.on("B_getRooms", getRooms_listener);
			if (rooms.length === 0) {
				props.appSocket.emit("F_getRooms", "");
			}
		}
		return () => {
			props.appSocket.removeAllListeners("B_getRooms");
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
		<div className="maobe-container">
			<ChannelPanel />

			<div id="middle-box">
				<RoomsPanel
					roomsList={rooms}
					onClick={onClick_Room}
					currRoomId={currRoomId}
					connectedUser={props.connectedUser}
					setCurrRoomId={ setCurrRoomId }
					setRooms={ setRooms }
					setMessageBarValue={setMessageBarValue}
					{...props}
				/>
				<StatusBar connectedUser={props.connectedUser} />
			</div>

			<div id="main">
				<RoomHeaderBar roomsList={rooms} currRoomId={currRoomId} />
				<div id="sub-main">
					<div className="content">
						<MessagePanel
							roomsList={rooms}
							currRoomId={currRoomId}
							messages={messages}
							setMessages={setMessages}
							{...props}
						/>
						<SendMessageBar
							currRoomId={currRoomId}
							roomsList={rooms}
							messages={messages}
							setMessages={setMessages}
							messageBarValues={messageBarValues}
							setMessageBarValue={setMessageBarValue}
							{...props}
						/>
					</div>
					<div id="participant-panel">
						<ParticipantsPanel
							roomsList={rooms}
							currRoomId={currRoomId}
							connectedUser={props.connectedUser}
							setCurrRoomId={setCurrRoomId}
							setRooms={ setRooms }
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
