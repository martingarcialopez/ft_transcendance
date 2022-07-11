import channel_logo from "../styles/assets/channel_logo.png";
import logoUser from "../styles/assets/logoUser.svg";
import explorarServidores from "../styles/assets/explorarServidores.svg";
import criarServidor from "../styles/assets/criarServidor.svg";

export function ChannelPanel(props: any) {
  return (
    <div id="left-bars">
      <img src={logoUser} alt="User" />
      <hr />
      <img src={channel_logo} alt="Unifil" />
      <img src={criarServidor} alt="Unifil" />
      <hr />
      <img src={explorarServidores} alt="Unifil" />
    </div>
  );
}
