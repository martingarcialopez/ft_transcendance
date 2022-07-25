import { useEffect } from "react";

interface I_LeaveRoom {
	userId: number;
	roomId: number;
}



export function LeaveRoomButton(props: any) {

	const leaveRoom_listener = (leaveRoom: I_LeaveRoom) => {
		const tmp_newRooms = props.roomsList.filter((obj: any) => obj.id !== leaveRoom.roomId);
		if (tmp_newRooms.length > 0) {
			props.setCurrRoomId(tmp_newRooms[0].id);
		} else {
			props.setCurrRoomId(-1);
		}
		props.setRooms(tmp_newRooms);
	};

	const onClick_leaveRoom = (roomId: number) => {
		props.appSocket.emit("F_leaveRoom", roomId, (isLeft: boolean) => {
			if (isLeft !== true) {
				alert("Something went wrong");
			}
		});
	};


	useEffect(() => {
		if (props.appSocket._callbacks["leaveRoom_listener"] === undefined) {
			props.appSocket.on("B_leaveRoom", leaveRoom_listener);
		}
		return () => {
			props.appSocket.removeAllListeners("B_leaveRoom");
		};
	});
	return (
		<button
			className="mao-btn-join-room"
			id="mao-leave-button"
			onClick={() => {
				onClick_leaveRoom(props.currRoom.id);
			}}
		>
			❌
		</button>
	);
}
