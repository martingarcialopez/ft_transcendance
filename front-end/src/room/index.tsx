import { AddRoom } from "./component/AddRoom";
import { AddParticipant } from "./component/AddParticipant";
import { RoomList } from "./component/RoomList";

export function IndexRoom() {
  return (
    <>
      <AddRoom />
      <br />
      <AddParticipant />
      <br />
      <RoomList />
    </>
  );
}
