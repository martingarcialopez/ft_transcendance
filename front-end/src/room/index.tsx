import { AddRoom } from "./component/AddRoom";
import { AddParticipant } from "./component/AddParticipant";
import { RoomPublic } from "./component/RoomPublic";
import { RoomProtected } from "./component/RoomProtected";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { T_Room } from "../type/chat";
import { ModifyRoom } from "./component/ModifyRoom";
import { AddAdmin } from "./component/AddAdmin";

/**
 *create a new room array depend on the @typeOfRoom
 *@typeOfRoom === "proctected" so the function will return room array of proctect room
 *@typeOfRoom === "public" so the function will return room array of public room
 */
function CoypRoom(room: T_Room[], typeOfRoom: string): T_Room[] {
  let newRoom = room.filter((item: T_Room) => {
    if (item.typeRoom === typeOfRoom) return item;
  });
  return newRoom;
}

/* function CoypRoom(room: T_Room[], id: number): T_Room[] {
 *   let newRoom = room.filter((item: T_Room) => {
 *     if (item.typeRoom === typeOfRoom) return item;
 *   });
 *   return newRoom;
 * }
 *  */
/**
 * this component  contain the setting room options
 */
export function IndexRoom() {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const publicRoom = CoypRoom(arrayRoom, "public");
  const protectedRoom = CoypRoom(arrayRoom, "protected");

  return (
    <>
      <AddRoom />
      <br />
      <AddParticipant />
      <br />
      <RoomPublic room={publicRoom} />
      <br />
      <RoomProtected room={protectedRoom} />
      <br />
      <ModifyRoom room={arrayRoom} />
      <br />
      <AddAdmin room={publicRoom} />
    </>
  );
}
