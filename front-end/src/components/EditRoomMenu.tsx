import { useState, useEffect, useRef } from "react";
import {
	ControlledMenu,
	FocusableItem,
} from "@szhsin/react-menu";
import settings from "../styles/assets/settings.svg";

interface I_Room {
    id: number;
    name: string;
    image: string;
    roomType: string;
    participants: any[];
}

export function EditRoomMenu(props: any) {
	const ref = useRef(null);
	const [isOpen, setOpen] = useState(false);

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
			roomId: props.currRoomId,
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
		let newRooms = props.roomsList.filter((obj: any) => obj.id !== updatedRoom.id);
		let oldRoom = props.roomsList.filter((obj: any) => obj.id === updatedRoom.id)[0];

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
		props.setRooms(newRooms);
	};

	useEffect(() => {
		if (props.appSocket._callbacks !== undefined && props.appSocket._callbacks["updateRoom_listener"] === undefined) {
			props.appSocket.on("B_updateRoom", updateRoom_listener);
		}
		if (
			props.appSocket._callbacks !== undefined &&
				props.appSocket._callbacks["getRoomAvailableUsers_listener"] === undefined
		) {
			props.appSocket.on(
				"B_getRoomAvailableUsers",
				getRoomAvailableUsers_listener
			);
		}
		return () => {
			props.appSocket.removeAllListeners("B_getRooms");
			props.appSocket.removeAllListeners("B_updateRoom");
			props.appSocket.removeAllListeners("B_getRoomAvailableUsers");
		};
	});




	if (
		props.currRoom.owner !== props.connectedUser.userId &&
			props.currRoom.admin.indexOf(props.connectedUser.userId) === -1
	) {
		return <div></div>;
	}

	let Html_AvailableUser: any = <div></div>;
	if (roomAvailableUsers !== undefined) {
		Html_AvailableUser = roomAvailableUsers.map((user: any, i: any) => {
			return (
				<div key={i} id="room-participants">
					<input
						id="room-participants-input"
						type="checkbox"
						onChange={(e) => onChange_selectRoomParticipant(e, user)}
					/>
					<img alt="User avatar" src={user.avatar} />
					<label>{user.username}</label>
				</div>
			);
		});
	}

	return (
		<div id="edit-room-button">
			<div
				ref={ref}
				className="mao-btn-edit-room"
				onClick={() => {
					setOpen(true);
					onClick_updateRoom(props.currRoom);
				}}
			>
				<img  id="edit-room-icon" alt="room settings" src={settings} />
			</div>

			<ControlledMenu
				id="edit-room-menu"
				state={isOpen ? "open" : "closed"}
				anchorRef={ref}
				onClose={() => setOpen(false)}
			>
				{/* ---------- */}
				<label> Room Name </label>
				<FocusableItem>
					{({ ref }: any) => (
						<input
							ref={ref}
							required
							type="text"
							placeholder="Name your new room"
							value={updateRoomName}
							onChange={(e) => setUpdateRoomName(e.target.value)}
						/>
					)}
				</FocusableItem>
				<hr />

				{/* ---------- */}
				<label> Room Type </label>
				<FocusableItem>
					{({ ref }: any) => (
						<select
							value={updateTypeRoom}
							onChange={(e) => {
								setUpdateTypeRoom(e.target.value);
							}}
							required
							className="mao-select"
						>
							<option>public</option>
							<option>private</option>
						</select>
					)}
				</FocusableItem>
				<hr />

				{/* ---------- */}
				<label> Password </label>
				<FocusableItem>
					{({ ref }: any) => (
						<input
							ref={ref}
							type="password"
							placeholder="Room password"
							value={updatePassWord}
							onChange={(e) => setUpdatePassword(e.target.value)}
						/>
					)}
				</FocusableItem>
				<hr />

				{/* ---------- */}
				<label> Participants </label>
				<FocusableItem>
					{({ ref }: any) => (
						<div ref={ref} className="room-participants-mgt">
							{Html_AvailableUser}
						</div>
					)}
				</FocusableItem>
				<hr />

				{/* ---------- */}
				<FocusableItem>
					{({ ref }: any) => (
						<button
							onClick={() => {
								onSubmit_updateRoom();
								setOpen(false);
							}}
							className="mao-button"
						>
							{" "}
							Update Room{" "}
						</button>
					)}
				</FocusableItem>
			</ControlledMenu>
		</div>
	);
}
