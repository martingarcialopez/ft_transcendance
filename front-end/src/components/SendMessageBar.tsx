import emote from "../styles/assets/emote.svg";
import gift from "../styles/assets/gift.svg";
import gif from "../styles/assets/gif.svg";
import plus from "../styles/assets/plus.svg";

export function SendMessageBar(props: any) {
	if (props.messageBarValues === undefined || props.currentRoomId === -1) {
    return <div></div>;
  }
	const onChange_setMessageBarValue = (value: string) => {
		if (props.messageBarValues !== undefined) {
			let newVarValues = new Map(props.messageBarValues);
			newVarValues.set(props.currRoomId, value);
			props.setMessageBarValue(newVarValues);
		}
	};
	const onSubmit_messageBar = (e: any) => {
		e.preventDefault();
		if (props.messageBarValues === undefined) {
			return;
		}

		var tmp_content = props.messageBarValues.get(props.currRoomId);
		if (tmp_content !== undefined && tmp_content.toUpperCase() === "MIAO")
			tmp_content = "😻";
		let messageToCreate = {
			roomId: props.currRoomId,
			content: tmp_content
		};

		props.appSocket.emit(
			"F_createMessage",
			messageToCreate,
			(isOk: boolean) => {
				if (isOk) {
					onChange_setMessageBarValue("");
				}
			}
		);
	};

  const currentRoom = props.roomsList.filter(
    (obj: any) => obj.id === props.currentRoomId
  )[0];
  if (currentRoom === undefined) {
    return <div></div>;
  }

  let placeholder_val = "Click here to start messaging";
  let isLocked = false;
  if (currentRoom !== undefined && currentRoom.participants !== undefined) {
    const this_participant = currentRoom.participants.filter(
      (obj: any) => obj.userId === props.connectedUser.userId
    )[0];
    isLocked = this_participant.isMute;
    if (isLocked === true) {
      placeholder_val = "⛔ You are muted ⛔";
    }
  }

  const currentValueBis = props.messageBarValues.get(props.currentRoomId);
  return (
    <div id="send-message" key={props.currentRoomId}>
      <img src={plus} alt="" />
      <form action="#" onSubmit={onSubmit_messageBar}>
        <input
          type="text"
          disabled={isLocked}
          value={currentValueBis}
          placeholder={placeholder_val}
          required
          onChange={(e) => {
            onChange_setMessageBarValue(e.target.value);
          }}
        />
      </form>
      <img src={gift} alt="" />
      <img src={gif} alt="" />
      <img src={emote} alt="" />
    </div>
  );
}
