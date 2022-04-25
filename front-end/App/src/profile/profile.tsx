import "./profile.css";

function Frame() {
  return (
    <div className="item1">
      <div className="center center">
        <div className="card">
          <div className="left">
            <div className="avatar">
              <img src="https://avatars.dicebear.com/api/human/:MARIA.svg" />
            </div>
            <div className="info">
              <span className="big name">salix dubois</span>
              <span className="small role"></span>
            </div>
            <div className="buttons">
              <button className="flw">follow</button>

              <button className="msg">Avatar</button>
            </div>
          </div>
          <div className="right">
            <div className="stats posts">
              <span className="big">523</span>
              <span className="small">posts</span>
            </div>
            <div className="stats likes">
              <span className="big">1387</span>
              <span className="small">likes</span>
            </div>
            <div className="stats flwrs">
              <span className="big">146</span>
              <span className="small">followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  return (
    <>
      <div className="container">
        <Frame />
        <h1 className="item2">ici il y'aura la liste de match jouer </h1>
      </div>
    </>
  );
}
