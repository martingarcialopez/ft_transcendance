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

function State() {
  return (
    <>
      <div className="item item2">state</div>
    </>
  );
}

function Avatar() {
  return (
    <>
      <div className="item item1">
        <img
          className="avatar"
          src="https://media.gqmagazine.fr/photos/5b991ca55e8dfe0011248115/4:3/w_744,h_558,c_limit/comment_avoir_les_muscles_de_50_cent_9596.jpeg"
        />
      </div>
    </>
  );
}

function FrientList() {
  return (
    <>
      <div className="item item3"></div>
    </>
  );
}

export function Profile() {
  return (
    <div className="container">
      <Avatar />
      <State />
      <FrientList />
    </div>
  );
}
