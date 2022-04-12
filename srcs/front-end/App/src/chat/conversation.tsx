import React from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";


function ButtonSendMessage() {
	return(
		<button className="send-msg"  >
			<BsFillArrowUpCircleFill className="send-msg" size={60}  color="Aquamarine" />
		</button>
	)
}


export function TextField() {

	return (
	  <form className="field-chat">
	  <textarea placeholder="Type message.." name="msg" required></textarea>	
	  <ButtonSendMessage  />
	</form>
	);
  }