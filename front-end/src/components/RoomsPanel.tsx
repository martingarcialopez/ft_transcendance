import { useState, useEffect, useRef } from "react";
import {
  ControlledMenu,
  MenuItem,
  useMenuState,
  FocusableItem,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import settings from "../styles/assets/settings.svg";

function JoinRoomMenu(props: any) {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  let Html_AvailableRooms = <div></div>;
  if (
    props.roomsDispoToJoin !== undefined &&
    props.roomsDispoToJoin.length > 0
  ) {
    Html_AvailableRooms = props.roomsDispoToJoin.map((room: any, i: any) => {
      let Html_password = <div></div>;
      if (room.is_protected === true) {
        Html_password = (
          <input type="password" placeholder="Password" required />
        );
      }

      return (
        <div key={i}>
          <form
            action="#"
            onSubmit={(e: any) => {
              e.preventDefault();
              setOpen(false);
              props.onSubmit_joinRoom(
                room.id,
                e.target[0].value,
                room.is_protected
              );
            }}
          >
            <a href="messages">
              <img alt="Room" src={room.image} />
              <label>{room.name}</label>
            </a>
            {Html_password}
            <button>JOIN</button>
            <hr />
          </form>
        </div>
      );
    });
  }
  return (
    <div>
      <button
        ref={ref}
        className="mao-btn-join-room"
        onClick={() => {
          setOpen(true);
          props.onClick_getRoomsDispoToJoin();
        }}
      >
        🔗
      </button>

      <ControlledMenu
        state={isOpen ? "open" : "closed"}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
        {/* ---------- */}
        <label> Public Rooms </label>
        <hr />
        <FocusableItem>
          {({ ref }: any) => <div ref={ref}>{Html_AvailableRooms}</div>}
        </FocusableItem>
      </ControlledMenu>
    </div>
  );
}

function CreateRoomMenu(props: any) {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [disablePassword, setDisablePassword] = useState(false);

  let Html_AvailableUser = <div></div>;
  if (props.availableUsers !== undefined && props.availableUsers.length > 0) {
    Html_AvailableUser = props.availableUsers.map((user: any, i: any) => {
      return (
        <div key={i} id="messages">
          <input
            type="checkbox"
            onChange={(e) => props.onChange_selectParticipant(e, user)}
          />
          <img alt="User avatar" src={user.avatar} />
          <label>{user.username}</label>
        </div>
      );
    });
  }

  return (
    <div>
      <button
        ref={ref}
        className="mao-btn-add-room"
        onClick={() => {
          setOpen(true);
          props.onClick_getAvailableUsers();
        }}
      ></button>

      <ControlledMenu
        state={isOpen ? "open" : "closed"}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
        {/* ---------- */}
        <label> Room Name </label>
        <FocusableItem>
          {({ ref }: any) => (
            <input
              ref={ref}
              required
              type="text"
              placeholder="Name your new room"
              maxLength={15}
              value={props.newRoomName}
              onChange={(e) => props.setNewRoomName(e.target.value)}
            />
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <label> Room Image </label>
        <FocusableItem>
          {({ ref }: any) => (
            <input
              ref={ref}
              required
              type="text"
              placeholder="Put an image url here"
              value={props.roomImage}
              onChange={(e) => props.setRoomImage(e.target.value)}
            />
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <label> Room Type </label>
        <FocusableItem>
          {({ ref }: any) => (
            <select
              value={props.roomType}
              onChange={(e) => {
                props.setTypeRoom(e.target.value);
              }}
              required
            >
              <option>public</option>
              <option>private</option>
            </select>
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <label> Password </label>
        <FocusableItem>
          {({ ref }: any) => (
            <input
              disabled={disablePassword}
              ref={ref}
              type="password"
              placeholder="Room password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <label> Participants </label>
        <FocusableItem>
          {({ ref }: any) => (
            <div ref={ref} className="room-participants-mgt">
              {Html_AvailableUser}
            </div>
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <FocusableItem>
          {({ ref }: any) => (
            <button
              onClick={() => {
                props.onSubmit_createRoom();
                setOpen(false);
              }}
            >
              {" "}
              Create Room{" "}
            </button>
          )}
        </FocusableItem>
      </ControlledMenu>
    </div>
  );
}

function EditRoomMenu(props: any) {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [disablePassword, setDisablePassword] = useState(false);

  if (
    props.currRoom.owner !== props.connectedUser.userId &&
    props.currRoom.admin.indexOf(props.connectedUser.userId) === -1
  ) {
    return <div></div>;
  }

  let Html_AvailableUser = <div></div>;
  if (props.roomAvailableUsers !== undefined) {
    Html_AvailableUser = props.roomAvailableUsers.map((user: any, i: any) => {
      return (
        <div key={i} id="room-participants">
          <input
            id="room-participants-input"
            type="checkbox"
            onChange={(e) => props.onChange_selectRoomParticipant(e, user)}
          />
          <img alt="User avatar" src={user.avatar} />
          <label>{user.username}</label>
        </div>
      );
    });
  }

  return (
    <div>
      <a
        href="mao-btn-join-room"
        ref={ref}
        className="mao-btn-join-room"
        onClick={() => {
          setOpen(true);
          props.onClick_updateRoom(props.currRoom);
        }}
      >
        <img alt="room settings" src={settings} />
      </a>

      <ControlledMenu
        menuClassName="nope"
        state={isOpen ? "open" : "closed"}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
        {/* ---------- */}
        <label> Room Name </label>
        <FocusableItem>
          {({ ref }: any) => (
            <input
              ref={ref}
              className="mao-menu-input"
              required
              type="text"
              placeholder="Name your new room"
              value={props.updateRoomName}
              onChange={(e) => props.setUpdateRoomName(e.target.value)}
            />
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <label> Room Type </label>
        <FocusableItem>
          {({ ref }: any) => (
            <select
              value={props.updateTypeRoom}
              onChange={(e) => {
                props.setUpdateTypeRoom(e.target.value);
              }}
              required
            >
              <option>public</option>
              <option>private</option>
            </select>
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <label> Password </label>
        <FocusableItem>
          {({ ref }: any) => (
            <input
              disabled={disablePassword}
              className="mao-menu-input"
              ref={ref}
              type="password"
              placeholder="Room password"
              value={props.updatePassWord}
              onChange={(e) => props.setUpdatePassword(e.target.value)}
            />
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <label> Participants </label>
        <FocusableItem>
          {({ ref }: any) => (
            <div ref={ref} className="room-participants-mgt">
              {Html_AvailableUser}
            </div>
          )}
        </FocusableItem>
        <hr />

        {/* ---------- */}
        <FocusableItem>
          {({ ref }: any) => (
            <button
              onClick={() => {
                props.onSubmit_updateRoom();
                setOpen(false);
              }}
            >
              {" "}
              Update Room{" "}
            </button>
          )}
        </FocusableItem>
      </ControlledMenu>
    </div>
  );
}

function LeaveRoomButton(props: any) {
  if (props.currRoom.owner === props.connectedUser.userId) {
    return <div></div>;
  }
  return (
    <button
      className="mao-btn-join-room"
      onClick={() => {
        props.onClick_leaveRoom(props.currRoom.id);
      }}
    >
      ❌
    </button>
  );
}

export function RoomsPanel(props: any) {
  const rooms = props.roomsList;
  const Html_roomsList = rooms.map((room: any, i: any) => {
    return (
      <div
        key={i}
        className="conversa"
        tabIndex={1}
        onClick={() => {
          props.onClick(room.id);
        }}
      >
        <img alt="room logo" src={room.image} />
        <a href="room-name" >{room.name}</a>
        <EditRoomMenu currRoom={room} {...props} />
        <LeaveRoomButton currRoom={room} {...props} />
      </div>
    );
  });

  return (
    <div>
      <div id="search-conversa">
        <input type="text" placeholder="Looking for a chat room ?" />
      </div>

      <div id="mensagens-diretas">
        <a href="Chat Rooms" > Chat Rooms</a>
        <JoinRoomMenu {...props} />
        <CreateRoomMenu {...props} />
      </div>

      <div className="test-xibao" id="mao-room-names">
        {Html_roomsList}
      </div>
    </div>
  );
}
