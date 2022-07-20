import {
  ControlledMenu,
  FocusableItem,
} from "@szhsin/react-menu";
import { useState, useEffect, useRef } from "react";

interface I_Room {
    id: number;
    name: string;
    image: string;
    roomType: string;
    participants: any[];
}

export function CreateRoomMenu(props: any) {
	const ref = useRef(null);
	const [isOpen, setOpen] = useState(false);

	const [newRoomName, setNewRoomName] = useState("");
	const [typeRoom, setTypeRoom] = useState("public");
	const [password, setPassword] = useState("");
	const [roomImage, setRoomImage] = useState("");
	const [availableUsers, setAvailableUsers] = useState<any[]>([]);
	const onClick_getAvailableUsers = () => {
		props.appSocket.emit("F_getAvailableUsers", true);
	};
	const getAvailableUsers_listener = (userList: any) => {
		setAvailableUsers(userList);
	};
	const [checkedAvailableUsers, setCheckedAvailableUsers] = useState(new Map());
	const [selectedNewParticipants, setSelectedNewParticipants] = useState<any[]>(
		[]
	);
	const onChange_selectParticipant = (e: any, user: any) => {
		let newParticipants;
		if (e.currentTarget.checked) {
			if (checkedAvailableUsers !== undefined) {
				checkedAvailableUsers.set(user.id, true);
			}
			newParticipants = selectedNewParticipants.slice();
			newParticipants.push(user);
			setSelectedNewParticipants(newParticipants);
		} else {
			if (checkedAvailableUsers !== undefined) {
				checkedAvailableUsers.set(user.id, false);
			}
			newParticipants = selectedNewParticipants.filter(
				(obj) => obj.id !== user.id
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
			password: password,
			users: selectedNewParticipants,
		};
		props.appSocket.emit("F_createRoom", RoomToCreate, (isCreated: boolean) => {
			if (isCreated !== true) {
				alert("Something went wrong");
			} else {
				setNewRoomName("");
				setRoomImage("");
				setTypeRoom("public");
				setPassword("");
				setSelectedNewParticipants([]);
				setCheckedAvailableUsers(new Map());
			}
		});
	};
	const createRoom_listener = (newRoom: I_Room) => {
		let newRooms = props.roomsList.slice();

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
		props.setRooms(newRooms);
		props.setCurrRoomId(newRoom.id);

		let newMessageBarValues = new Map(props.messageBarValues);
		newMessageBarValues.set(newRoom.id, "");
		props.setMessageBarValue(newMessageBarValues);
	};



	useEffect(() => {
		if (props.appSocket._callbacks !== undefined && props.appSocket._callbacks["createRoom_listener"] === undefined) {
			props.appSocket.on("B_createRoom", createRoom_listener);
		}
		if (props.appSocket._callbacks !== undefined &&
			props.appSocket._callbacks["getAvailableUsers_listener"] === undefined
		) {
			props.appSocket.on("B_getAvailableUsers", getAvailableUsers_listener);
		}
		return () => {

			props.appSocket.removeAllListeners("B_createRoom");
			props.appSocket.removeAllListeners("B_getAvailableUsers");

		};
	});

	let Html_AvailableUser: any = <div></div>;

	if (availableUsers !== undefined && availableUsers.length > 0) {
		Html_AvailableUser = availableUsers.map((user: any, i: any) => {

			let isChecked = false;
			if (checkedAvailableUsers !== undefined) {
				isChecked = checkedAvailableUsers.get(user.id) || false;
			}
			return (
				<div key={i} id="create-room-participant">
				  <input
					checked={isChecked}
					type="checkbox"
					onChange={(e) => onChange_selectParticipant(e, user)}
					/>
					<img alt="User avatar" src={user.avatar} />
					<label>{user.username}</label>
				</div>
			);
		});
	}

	return (
		<div id="create-room-menu">
		  <button
			ref={ref}
			className="mao-btn-add-room"
			onClick={() => {
				setOpen(true);
				onClick_getAvailableUsers();
			}}
			>➕</button>

		  <ControlledMenu
			state={isOpen ? "open" : "closed"}
			anchorRef={ref}
			onClose={() => {
				setOpen(false);
				setSelectedNewParticipants([]);
			}}
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
					maxLength={15}
					value={newRoomName}
					onChange={(e) => setNewRoomName(e.target.value)}
					/>
			  )}
        </FocusableItem>
			<hr />

        {/* ---------- */}
			<label> Room Image </label>
			<FocusableItem>
			{({ ref }: any) => (
				<input
				  ref={ref}
				  required
				  type="text"
				  placeholder="Put an image url here"
				  value={roomImage}
				  onChange={(e) => setRoomImage(e.target.value)}
				  />
			)}
        </FocusableItem>
			<hr />

        {/* ---------- */}
			<label> Room Type </label>
			<FocusableItem>
			{({ ref }: any) => (
				<select
				  value={typeRoom}
				  onChange={(e) => {
					  setTypeRoom(e.target.value);
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
				  value={password}
				  onChange={(e) => setPassword(e.target.value)}
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
					  onSubmit_createRoom();
					  setOpen(false);
					}}
					className="mao-button"
				  >
				  {" "}
				  Create Room{" "}
				</button>
			)}
        </FocusableItem>
			</ControlledMenu>
			</div>
	);
}
