import { CreateRoom } from "../components/CreateRoom";
import { AddParticipant } from "../components/AddParticipant";
import { JoinPublicRoom } from "../components/JoinPublicRoom";
import { JoinProtectedRoom } from "../components/JoinProtectedRoom";
import { RootState } from "../redux/store";
import { T_Room } from "../type/chat";
import { ModifyRoom } from "../components/ModifyRoom";
import { AddAdmin } from "../components/AddAdmin";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducers";

/**
 * create a new room array depend on the @typeOfRoom
 * this function filter room depend typeOfRoom
 * @typeOfRoom === "proctected" so the function will return room array of proctect room
 * @typeOfRoom === "public" so the function will return room array of public room
 */
function CoypRoom(room: T_Room[], typeOfRoom: string): T_Room[] {
  return room.filter((item: T_Room) => item.typeRoom === typeOfRoom);
}

/**
 * this function filter room depend @userId
 * create new room array which contain the userId inside  owener[]
 * @userId of current user
 */
function GetRoomUserAdmin(room: T_Room[], userId: number): T_Room[] {
  return room.filter((item: T_Room) => item.owner.includes(userId));
}

/**
 * tab it is a array of participants some room
 */
function CheckParticipant(tab: any[], userId: number) {
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].userId === userId) return false;
  }
  return true;
}

/**
 * this function return a roomArray where the current user is not participant
 * @userId the current user
 */
function RoomUserNotParticipants(room: T_Room[], userId: number) {
  return room.filter((item: T_Room) =>
    CheckParticipant(item.participants, userId)
  );
}

/**
 * this component  contain the setting room options
 */
export function Room() {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const publicRoom = CoypRoom(arrayRoom, "public");
  const protectedRoom = CoypRoom(arrayRoom, "protected");
  const pvRoom = CoypRoom(arrayRoom, "private");
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo }: UserState = userLogin;

  if (!userInfo) {
    return <h1>Loading...</h1>;
  }
  console.log("userId: ", userInfo.id);
  const roomUserIsAdmin = GetRoomUserAdmin(arrayRoom, userInfo.id);
  console.log("userId: ", userInfo.id);
  return (
    <>
      <CreateRoom />
      <br />
      <AddParticipant room={RoomUserNotParticipants(pvRoom, userInfo.id)} />
      <br />
      <JoinPublicRoom room={RoomUserNotParticipants(publicRoom, userInfo.id)} />
      <br />
      <JoinProtectedRoom
        room={RoomUserNotParticipants(protectedRoom, userInfo.id)}
      />
      <br />
      <ModifyRoom room={roomUserIsAdmin} />
      <br />
      <AddAdmin room={roomUserIsAdmin} />
    </>
  );
}
