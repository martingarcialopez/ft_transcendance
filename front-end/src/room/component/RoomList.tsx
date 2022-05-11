import { T_Room } from "../../type/chat";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BsPlusLg } from "react-icons/bs";
import "../../styles/room.css";
import { socket } from "../../chat/components/ChatTemplate";

export function JoinRoom(userId: number, roomId: number, pwd: string) {
  socket.emit("JoinRoom", {
    userId: userId,
    roomId: roomId,
    password: pwd,
  });
  console.log("user :", userId, " roomId:", roomId, " password:", pwd);
  socket.on("hasJoined", (receive: { state: boolean }) => {
    console.log("reponse hasJoined Room : ", receive);
  });
}

/*
 * display all chanel with option to join it or leave it
 */

export function RoomList() {
  const { arrayRoom } = useSelector((state: RootState) => state);
  return (
    <>
      <h3 style={{ position: "relative", left: "25%" }}>Public</h3>
      <div className="box-Room">
        {arrayRoom.map((item: T_Room, index: number) => (
          <div className="roomList" key={index}>
            <span
              className="btn-join-room"
              onClick={() => {
                console.log("Public: ");
                JoinRoom(3, 23, "");
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
