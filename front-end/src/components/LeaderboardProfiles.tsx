import "../styles/leaderboardStyles.css";
import { useNavigate } from "react-router-dom";

import { GetUserInfo } from "../components/GetUserInfo";

export const LeaderboardProfiles = ({ Leaderboard }: any) => {
  const Item = (data: any) => {

    // const Leaderboard =
    //     {
    //         name: "Shawn Hanna",
    //         location: "India",
    //         score: 1550,
    //         img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    //         dt: "2022-02-10"
    //     }
    const navigate = useNavigate();

    const userInfo = GetUserInfo();
    if (!userInfo) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        {data.map((value: any, index: any) => (
          <div className="flex" key={index}>
            <div className="item">
              <img
                src={value.avatar}
                alt=""
                onClick={() => {
                  if (value.name !== userInfo.lastname)
                    navigate(`/profile/${value.name}`);
                }}
              />

              <div className="info">
                <h3
                  className="name text-dark"
                  onClick={() => {
                    if (value.name !== userInfo.lastname)
                      navigate(`/profile/${value.name}`);
                  }}
                >
                  {value.name}
                </h3>
                <span>{value.username}</span>
              </div>
            </div>
            <div className="item">
              <span>{value.score}</span>
            </div>
          </div>
        ))}
      </>
    );
  };

  return <div id="LeaderProfile">{Item(Leaderboard)}</div>;
};
