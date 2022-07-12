import {
ControlledMenu,
MenuItem,
useMenuState,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import { useState } from "react";
import { ParticipantAdminContextMenu } from './ParticipantAdminContextMenu';
import { ParticipantBasicContextMenu } from './ParticipantBasicContextMenu';

function ParticipantSetAsAdminContextMenu(props: any) {
  if (
    props.currentUser.userId === props.connectedUser.userId ||
    props.currentRoom.owner === props.currentUser.userId ||
    props.currentRoom.owner !== props.connectedUser.userId
  ) {
    return <div></div>;
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
          props.onClick_setAsAdmin(
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

function ParticipantContextMenu(props: any) {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  let userRole = "";
  if (props.currentRoom.owner === props.currentUser.userId) {
    userRole = "👑 ";
  } else if (props.currentRoom.admin.indexOf(props.currentUser.userId) !== -1) {
    userRole = "👮 ";
  }
  let isMute = "";
  if (props.currentUser.isMute) {
    isMute = "🔇";
  }
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
      }}
    >
      <div id="messages">
        <img src={props.currentUser.avatar} alt="" />
        <div id="column-message">
          <div id="message-send">
            <a href="message-send" >
              {props.currentUser.username} {userRole} {isMute}
            </a>
          </div>
        </div>
      </div>

      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
      >
        <ParticipantBasicContextMenu {...props} />
        <ParticipantSetAsAdminContextMenu {...props} />
        <ParticipantAdminContextMenu {...props} />
      </ControlledMenu>
    </div>
  );
}

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
        <img src="" alt="" />
        <a href="Participants">Participants</a>
      </div>

      {Html_participants}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
