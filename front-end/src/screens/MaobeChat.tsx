import socketio from "socket.io-client";
import { GetUserInfo } from "../components/GetUserInfo";
import { Chat } from "../components/Maobe_Chat";

export const MaobeChat = () => {
  const userInfo = GetUserInfo();
  if (userInfo === undefined) {
    return <div></div>;
  }
  const socket = socketio("http://localhost:3000", {
    extraHeaders: {
      Authorization: `Bearer ${userInfo.access_token}`,
      userId: userInfo.id,
    },
  });

  const connectedUser = {
    userId: userInfo.id,
    username: userInfo.username,
    avatar: userInfo.avatar,
  };

  return (
    <div className="App">
      <Chat appSocket={socket} connectedUser={connectedUser} />
    </div>
  );
}