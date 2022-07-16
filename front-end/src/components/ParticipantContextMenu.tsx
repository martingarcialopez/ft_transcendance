import {ControlledMenu, useMenuState} from "@szhsin/react-menu";
import { useState } from "react";
import { ParticipantAdminContextMenu } from './ParticipantAdminContextMenu';
import { ParticipantBasicContextMenu } from './ParticipantBasicContextMenu';
import { ParticipantSetAsAdminContextMenu } from './ParticipantSetAsAdminContextMenu';

export function ParticipantContextMenu(props: any) {
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
      <div id="edit-room-participant">
        <img src={props.currentUser.avatar} alt="" />
        <div id="column-message">
          <div id="message-send">
            <div>
              {props.currentUser.username} {userRole} {isMute}
            </div>
          </div>
        </div>
      </div>

      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
          onClose={() => toggleMenu(false)}
		  className="participant-context-menu"
      >
        <ParticipantBasicContextMenu {...props} />
        <ParticipantSetAsAdminContextMenu{...props} />
        <ParticipantAdminContextMenu {...props} />
 </ControlledMenu>
    </div>
  );
}
