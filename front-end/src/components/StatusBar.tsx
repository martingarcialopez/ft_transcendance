import settings from "../styles/assets/settings.svg";
import microfoneMuted from "../styles/assets/microfoneMuted.svg";
import audio from "../styles/assets/audio.svg";

export function StatusBar(props: any) {
  return (
    <div id="status">
      <div className="content-status">
        <img src={props.connectedUser.avatar} alt="ProfilePhoto" />

        <div id="name-id">
          {props.connectedUser.username}
        </div>

        <div id="icons">
          <div className="icon">
            <img src={microfoneMuted} alt="" />
          </div>

          <div className="icon">
            <img src={audio} alt="" />
          </div>

          <div className="icon">
            <img src={settings} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
