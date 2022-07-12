import {
ControlledMenu,
MenuItem,
useMenuState,

} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ParticipantAdminContextMenu(props: any) {
  if (
    (props.currentRoom.owner !== props.connectedUser.userId &&
      props.currentRoom.admin.indexOf(props.connectedUser.userId) === -1) ||
    props.currentRoom.owner === props.currentUser.userId ||
    props.currentUser.userId === props.connectedUser.userId
  ) {
    return <div></div>;
  }
  return (
    <div>
      {/* ----- KICK ----- */}
      <MenuItem
        onClick={() =>
          props.onClick_kick(props.currentUser.userId, props.currRoomId)
        }
      >
        Kick {props.currentUser.username}
      </MenuItem>
      <hr />

      {/* ----- BAN ----- */}
      <MenuItem
        onClick={() =>
          props.onClick_ban(props.currentUser.userId, props.currRoomId)
        }
      >
        Ban {props.currentUser.username}
      </MenuItem>
      <hr />

      {/* ----- MUTE ----- */}
      <MenuItem
        onClick={() =>
          props.onClick_mute(props.currentUser.userId, props.currRoomId)
        }
      >
        Mute {props.currentUser.username}
      </MenuItem>
      <hr />
    </div>
  );
}

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

function ParticipantBasicContextMenu(props: any) {
  const navigate = useNavigate();

  if (props.currentUser.userId === props.connectedUser.userId) {
    return <div></div>;
  }
  return (
    <div>
      {/* ----- BLOCK ----- */}
      <MenuItem
        onClick={() =>
          props.onClick_block(props.currentUser.userId, props.currRoomId)
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
          props.onClick_directMessage(
            props.currentUser.userId,
            props.currentUser.username
          )
        }
      >
        Send Message {props.currentUser.username}
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
