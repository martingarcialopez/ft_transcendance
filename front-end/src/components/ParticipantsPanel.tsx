import "@szhsin/react-menu/dist/core.css";
import { ParticipantContextMenu } from './ParticipantContextMenu';

export function ParticipantsPanel(props: any) {
  if (
    props.currRoomId === -1 ||
    props.roomsList === undefined ||
    props.roomsList.length === 0
  ) {
    return <div></div>;
  }
  const currentRoom = props.roomsList.filter(
    (obj: any) => obj.id === props.currRoomId
  )[0];
  if (currentRoom === undefined || currentRoom.participants === undefined) {
    return <div></div>;
  }
  const Html_participants = currentRoom.participants.map(
    (currentUser: any, i: any) => {
      if (currentUser === undefined) {
        return <div></div>;
      }
      return (
        <div key={i}>
          <ParticipantContextMenu
            currentUser={currentUser}
            currentRoom={currentRoom}
            {...props}
          />
        </div>
      );
    }
  );

  return (
    <div>
      <div id="profile">
        <h3 id="participant-title">Participants</h3>
      </div>

      {Html_participants}
    </div>
  );
}
