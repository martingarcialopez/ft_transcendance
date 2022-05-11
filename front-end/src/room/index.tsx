import { AddRoom } from "./component/AddRoom";
import { AddParticipant } from "./component/AddParticipant";
import { RoomList } from "./component/RoomList";
import { RoomProtected } from "./component/Modal";
export function IndexRoom() {
  return (
    <>
      <AddRoom />
      <br />
      <AddParticipant />
      <br />
      <RoomList />
      <RoomProtected />
    </>
  );
}
