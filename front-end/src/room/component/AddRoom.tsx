import "../styles/settingChannel.css";
export function AddRoom() {
  return (
    <>
      <form className="theForm">
        <input
          type="text"
          placeholder="Name of new channel"
          required
          autoComplete="on"
        />
        <br />
        <input
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
