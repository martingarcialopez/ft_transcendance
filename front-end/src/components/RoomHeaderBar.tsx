import arroba from "../styles/assets/arroba.svg";
import call from "../styles/assets/call.svg";
import video from "../styles/assets/video.svg";
import fix from "../styles/assets/fix.svg";
import add from "../styles/assets/add.svg";
import duvidas from "../styles/assets/duvidas.svg";
import caixaEntrada from "../styles/assets/caixaEntrada.svg";
import ocupado from "../styles/assets/ocupado.svg";

export function RoomHeaderBar(props: any) {
  if (props.roomsList.length === 0) {
    return <div></div>;
  }
  const currentRoom = props.roomsList.filter(
    (obj: any) => obj.id === props.currRoomId
  )[0];
  if (currentRoom === undefined) {
    return <div></div>;
  }
  return (
    <div className="top-bar">
      <div id="nome-conversa">
        <img src={arroba} alt="" />
        <a href="currentRoom name" >{currentRoom.name} </a>
        <img src={ocupado} alt="" />
      </div>

      <div id="buttons-bar">
        <img src={call} alt="" />
        <img src={video} alt="" />
        <img src={fix} alt="" />
        <img src={add} alt="" />
        <input type="text" placeholder="Search" />
        <img src={caixaEntrada} alt="" />
        <img src={duvidas} alt="" />
      </div>
    </div>
  );
}
