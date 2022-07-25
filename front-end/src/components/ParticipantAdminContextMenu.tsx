import {
MenuItem,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";

export function ParticipantAdminContextMenu(props: any) {
  if (
    (props.currentRoom.owner !== props.connectedUser.userId &&
      props.currentRoom.admin.indexOf(props.connectedUser.userId) === -1) ||
    props.currentRoom.owner === props.currentUser.userId ||
    props.currentUser.userId === props.connectedUser.userId
  ) {
    return <div></div>;
  }
	const onClick_kick = (userId: number, roomId: number) => {
        props.appSocket.emit(
            "F_kickUser",
            {
                userId: userId,
                roomId: roomId,
            },
            (isKicked: boolean) => {
                if (isKicked === true) {
                    let newRooms = props.roomsList.slice();
                    var index = newRooms.findIndex((obj: any) => obj.id === roomId);
                    var unkicked_participants = newRooms[index].participants.filter(
                        (obj: any) => obj.userId !== userId
                    );
                    newRooms[index].participants = unkicked_participants;
                    props.setRooms(newRooms);
                } else {
                    alert("Something went wrong");
                }
            }
        );
    };

    const onClick_ban = (userId: number, roomId: number) => {
		props.appSocket.emit(
            "F_banUser",
            {
                userId: userId,
                roomId: roomId,
            },
            (isBanned: boolean) => {
                if (isBanned === true) {
                    let newRooms = props.roomsList.slice();
                    var index = newRooms.findIndex((obj: any) => obj.id === roomId);
                    var unbaned_participants = newRooms[index].participants.filter(
         				(obj: any) => obj.userId !== userId
                    );
                    newRooms[index].participants = unbaned_participants;
                    props.setRooms(newRooms);
				} else {
                    alert("Something went wrong");
				}
            }
		);
    };

	const onClick_mute = (userId: number, roomId: number) => {
        props.appSocket.emit(
            "F_muteUser",
            {
                userId: userId,
                roomId: roomId,
            },
            (isMuted: boolean) => {
                if (isMuted === true) {
                    let newRooms = props.roomsList.slice();
                    var index = newRooms.findIndex((obj: any) => obj.id === roomId);
                    var user_index = newRooms[index].participants.findIndex(
                        (obj: any) => obj.userId === userId
                    );
                    newRooms[index].participants[user_index]["mute"] = true;
                    props.setRooms(newRooms);
                } else {
                    alert("Something went wrong");
                }
            }
        );

    };


  return (
    <div>
      {/* ----- KICK ----- */}
      <MenuItem
        onClick={() =>
			onClick_kick(props.currentUser.userId, props.currRoomId)
        }
      >
        Kick {props.currentUser.username}
      </MenuItem>
      <hr />

      {/* ----- BAN ----- */}
      <MenuItem
        onClick={() =>
			onClick_ban(props.currentUser.userId, props.currRoomId)
        }
      >
        Ban {props.currentUser.username}
      </MenuItem>
      <hr />

      {/* ----- MUTE ----- */}
      <MenuItem
        onClick={() =>
			onClick_mute(props.currentUser.userId, props.currRoomId)
        }
      >
        Mute {props.currentUser.username}
      </MenuItem>
      <hr />
    </div>
  );
}
