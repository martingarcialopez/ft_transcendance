import "../styles/settingChannel.css";
export const Room = () => {
  return (
    <>
      <form className="theForm">
        <input
          className="inputRoom"
          type="text"
          placeholder="Name of new channel"
          required
          autoComplete="on"
        />
        <br />
        <input
          className="inputRoom"
          type="password"
          placeholder="password"
          required
          autoComplete="on"
        />
        <br />
        <select id="pet-select">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <br />
        <input type="submit" value="New Chanel" />
      </form>
    </>
  );
}
