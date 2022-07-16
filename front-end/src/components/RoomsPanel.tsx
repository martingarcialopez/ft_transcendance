import { LeaveRoomButton } from "./LeaveRoomButton";
import { EditRoomMenu } from "./EditRoomMenu";
import { CreateRoomMenu } from "./CreateRoomMenu";
import { JoinRoomMenu } from "./JoinRoomMenu";

export function RoomsPanel(props: any) {
	const rooms = props.roomsList;
	const Html_roomsList = rooms.map((room: any, i: any) => {
		return (
			<div
			  key={i}
			  className="conversa"
			  tabIndex={1}
			  onClick={() => {
				  props.onClick(room.id);
			  }}
			  >
			  <img alt="room logo" src={room.image} />
			  <div id="room-names">{room.name}</div>
			  <EditRoomMenu currRoom={room} {...props} />
			  <LeaveRoomButton currRoom={room} {...props} />
			</div>
		);
	});

	return (
		<div>
		  <div id="search-conversa">
			<input type="text" placeholder="Looking for a chat room ?" />
		  </div>

		  <div id="mensagens-diretas">
			<div> Chat Rooms</div>
			<JoinRoomMenu {...props} />
			<CreateRoomMenu {...props} />
		  </div>

		  <div className="test-xibao" id="mao-room-names">
			{Html_roomsList}
		  </div>
		</div>
	);
}
