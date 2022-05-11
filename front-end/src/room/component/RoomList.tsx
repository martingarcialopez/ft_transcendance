import { T_Room, T_User } from "../../type/chat";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BsPlusLg } from "react-icons/bs";
import "../../styles/room.css";
import { socket } from "../../chat/components/ChatTemplate";
import { useState } from "react";

/* const style = {
 * 	display:none;
 * };
 *  */

function JoinRoom(userId: number, roomId: number, pwd: string) {
  socket.emit("JoinRoom", {
    userId: userId,
    roomId: roomId,
    password: pwd,
  });
}
type AppProps = {
  roomId: number;
  setRoomId: any;
}; /* use `interface` if exporting so that consumers can extend */

function IsProctect({ roomId, setRoomId }: AppProps) {
  if (roomId > 0) {
    return (
      <div>
        <br />
        <form>
          <input
            className="inputRoom roomProtected"
            type="password"
            placeholder="channel protected by password"
            required
            autoComplete="on"
          />
        </form>
      </div>
    );
  }
  return <></>;
}

/*
 * display all chanel with option to join it or leave it
 */

export function RoomList() {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const [roomId, setRoomId] = useState<number>(-1);
  let toto: AppProps = { roomId, setRoomId };
  return (
    <>
      <div className="box-Room">
        <IsProctect {...toto} />;
        {arrayRoom.map((item: T_Room, index: number) => (
          <div className="roomList" key={index}>
            <span
              className="btn-join-room"
              onClick={() => {
                if (item.typeRoom === "protected") setRoomId(item.id);
                else console.log("pass");
                //setRoomId(-1);
              }}
            >
              <BsPlusLg />
            </span>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}
