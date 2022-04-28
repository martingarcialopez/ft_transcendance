import "./profile.css";

function State() {
  return (
    <>
      <div className="item container-2 item2">
        <div className="stats posts">
          <div className="big">523</div>
          <div className="small">Win</div>
        </div>

        <div className="stats likes">
          <div className="big">1387</div>
          <div className="small">Lost</div>
        </div>

        <div className="stats flwrs">
          <div className="big">146</div>
          <div className="small">followers</div>
        </div>
      </div>
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
        <div className="container-3">
          <span className="user-name item-3-1">salix dubois</span>

          <button className="btn-flwrs item-3-2">follow</button>

          <button className="btn-Avatar item-3-3">Avatar</button>
        </div>
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
