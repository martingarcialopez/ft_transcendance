import { useEffect } from "react";
import {
  ControlledMenu,
  FocusableItem,
} from "@szhsin/react-menu";
import { useState, useRef } from "react";

interface I_Room {
    id: number;
    name: string;
    image: string;
    roomType: string;
    participants: any[];
}


export function JoinRoomMenu(props: any) {

	const ref = useRef(null);
	const [isOpen, setOpen] = useState(false);

	const [roomsDispoToJoin, setRoomsDispoToJoin] = useState<any[]>([]);
	const onClick_getRoomsDispoToJoin = () => {
		props.appSocket.emit("F_getDispoRooms", true);
	};
	const getRoomsDispoToJoin_listener = (dispoRooms: I_Room[]) => {
		setRoomsDispoToJoin(dispoRooms);
	};

	useEffect(() => {
		if (props.appSocket._callbacks !== undefined &&
			props.appSocket._callbacks["getRoomsDispoToJoin_listener"] === undefined
		) {
			props.appSocket.on("B_getDispoRooms", getRoomsDispoToJoin_listener);
		}
		if (props.appSocket._callbacks !== undefined && props.appSocket._callbacks["joinRoom_listener"] === undefined) {
			props.appSocket.on("B_joinRoom", joinRoom_listener);
		}
		return () => {
			props.appSocket.removeAllListeners("B_getDispoRooms");
			props.appSocket.removeAllListeners("B_joinRoom");

		};
	});

	const onSubmit_joinRoom = (
		roomId: number,
		password: string,
		isProtected: boolean
	) => {
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
		let newRooms = props.roomsList.slice();
		newRooms.unshift(newRoom);
		props.setRooms(newRooms);
		props.setCurrRoomId(newRoom.id);

		let newMessageBarValues = new Map(props.messageBarValues);
		newMessageBarValues.set(newRoom.id, "");
		props.setMessageBarValue(newMessageBarValues);
	};


	let Html_AvailableRooms: any = <div></div>;
	if (
		roomsDispoToJoin !== undefined &&
			roomsDispoToJoin.length > 0
	) {
		Html_AvailableRooms = roomsDispoToJoin.map((room: any, i: any) => {
			let Html_password = <div></div>;
			if (room.is_protected === true) {
				Html_password = (
					<input type="password" placeholder="Password" required />
				);
			}

			return (
				<div key={i}>
				  <form
					action="#"
					onSubmit={(e: any) => {
						e.preventDefault();
						setOpen(false);
						onSubmit_joinRoom(
							room.id,
							e.target[0].value,
							room.is_protected
						);
					}}
					>
					<div>
					  <img id="join-room-img" alt="Room" src={room.image} />
					  <label>{room.name}</label>
					</div>
					{Html_password}
					<button className="mao-button">JOIN</button>
					<hr />
				  </form>
				</div>
			);
		});
	}
	return (
		<div>
		  <button
			ref={ref}
			className="mao-btn-join-room"
			onClick={() => {
				setOpen(true);
				onClick_getRoomsDispoToJoin();
			}}
			>
			🔗
		  </button>

		  <ControlledMenu
			state={isOpen ? "open" : "closed"}
			anchorRef={ref}
			onClose={() => setOpen(false)}
			>
			{/* ---------- */}
			<label> Public Rooms </label>
			<hr />
			<FocusableItem>
			  {({ ref }: any) => <div ref={ref}>{Html_AvailableRooms}</div>}
			</FocusableItem>
		  </ControlledMenu>
		</div>
	);
}
