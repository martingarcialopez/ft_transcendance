import { MenuItem } from "@szhsin/react-menu";
import { useNavigate } from "react-router-dom";
import {v4} from 'uuid';

export function ParticipantBasicContextMenu(props: any) {
  const navigate = useNavigate();

  if (props.currentUser.userId === props.connectedUser.userId) {
    return <div></div>;
  }
  const onClick_block = (userId: number, roomId: number) => {
    props.appSocket.emit("F_blockUser", userId, (isBlocked: boolean) => {
      if (isBlocked === true) {
        let newRooms = props.roomsList.slice();
        var index = newRooms.findIndex((obj: any) => obj.id === roomId);
        var unbaned_participants = newRooms[index].participants.filter(
          (obj: any) => obj.userId !== userId
        );
        newRooms[index].participants = unbaned_participants;
        props.setRooms(newRooms);

        const tmpCurrRoom = newRooms.filter(
          (obj: any) => obj.id === props.currRoomId
        );
        if (tmpCurrRoom.length !== 1) {
          props.setCurrRoomId(-1);
        }

        if (props.messages !== undefined) {
          let room_message = props.messages.get(roomId);
          if (room_message !== undefined) {
            let res = room_message.filter((obj: any) => obj.userId !== userId);
            const newMessages = new Map(props.messages);
            newMessages.set(roomId, res);
            props.setMessages(newMessages);
          }
        }
        props.appSocket.emit("F_getRooms", "");
      } else {
        alert("Something went wrong");
      }
    });
  };

  const onClick_directMessage = (userId: number, username: string, invitation: boolean) => {
    let roomFounded = false;
    props.roomsList.forEach((room: any) => {
      if (roomFounded === true) {
        return;
      }
      if (room.participants.length === 2) {
        const userMatch = room.participants.filter(
          (obj: any) => obj.userId === userId
        );
        if (userMatch.length === 1) {
          props.setCurrRoomId(room.id);
          roomFounded = true;
        }
      }
    });

    if (roomFounded === false) {
      const newPmRoom = {
        name: `PM ${username}`,
        image: "",
        typeRoom: "private",
        password: "",
        users: [{ id: userId }],
      };
      props.appSocket.emit("F_createRoom", newPmRoom, (isCreated: boolean) => {
        if (isCreated !== true) {
          alert("Something went wrong");
        } else if (props.roomList) {
          props.roomsList
					.filter((room: any) => room.name === `PM ${username}`)
					.forEach((room: any) => props.setCurrRoomId(room.id));
        }
      });
    }
  };

  const onClick_InvitationMessage = (userId: number, username: string, invitation: boolean) => {

    const pongRoomId: string = v4();

    let messageToCreate = {
      roomId: props.currRoomId,
    	content: `<a href="/joingame/${pongRoomId}">join pong game</a>`
    };
    props.appSocket.emit("F_createMessage", messageToCreate);
  };

  return (
    <div>
      {/* ----- BLOCK ----- */}
      <MenuItem
        onClick={() =>
          onClick_block(props.currentUser.userId, props.currRoomId)
        }
      >
        Block {props.currentUser.username}
      </MenuItem>
      <hr />

      {/* ----- ACCESS PROFILE ----- */}
      <MenuItem
        onClick={() => {
          navigate(`/profile/${props.currentUser.username}`);
        }}
      >
        Access {props.currentUser.username} profile
      </MenuItem>
      <hr />

      {/* ----- Direct Message ----- */}
      <MenuItem
        onClick={() =>
          onClick_directMessage(
            props.currentUser.userId,
            props.currentUser.username,
            false
          )
        }
      >
        Send Message {props.currentUser.username}
      </MenuItem>
      <hr />

      {/* ----- Invitation to a Game ----- */}

      <MenuItem
        onClick={() =>
          onClick_InvitationMessage(
            props.currentUser.userId,
            props.currentUser.username,
            true
          )
        }
      >
        {" "}
        Invite to a game
      </MenuItem>
      <hr />
    </div>
  );
}
