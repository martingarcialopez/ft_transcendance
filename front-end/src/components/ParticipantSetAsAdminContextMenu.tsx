import {
MenuItem,
} from "@szhsin/react-menu";

export function ParticipantSetAsAdminContextMenu(props: any) {
  if (
    props.currentUser.userId === props.connectedUser.userId ||
    props.currentRoom.owner === props.currentUser.userId ||
    props.currentRoom.owner !== props.connectedUser.userId
  ) {
    return <div></div>;
  }

	const onClick_setAsAdmin = (userId: number, roomId: number, toAdd: boolean) => {
		props.appSocket.emit(
			"F_setAsAdmin",
            {
                userId: userId,
                roomId: roomId,
                toAdd: toAdd,
            },
            (isSet: boolean) => {
                if (isSet !== true) {
                    alert("Something went wrong");
                }
            }
        );
    }

  let toAdd = true;
  let label = `Set as Admin ${props.currentUser.username}`;
  if (props.currentRoom.admin.indexOf(props.currentUser.userId) !== -1) {
    toAdd = false;
    label = `Remove from Admin role ${props.currentUser.username}`;
  }
  return (
    <div>
      <MenuItem
        onClick={() =>
			onClick_setAsAdmin(
            props.currentUser.userId,
            props.currRoomId,
            toAdd
          )
        }
      >
        {label}
      </MenuItem>
      <hr />
    </div>
  );
}
