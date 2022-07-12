import "../styles/leaderboardStyles.css";
export const LeaderboardProfiles = ({ Leaderboard }: any) => {
  console.log("LeaderboardProfiles Leaderboard", Leaderboard);
  const Item = (data: any) => {
    console.log("LeaderboardProfiles data", data);

    // const Leaderboard =
    //     {
    //         name: "Shawn Hanna",
    //         location: "India",
    //         score: 1550,
    //         img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    //         dt: "2022-02-10"
    //     }

    return (
      <>
        {data.map((value: any, index: any) => (
          <div className="flex" key={index}>
            <div className="item">
              <img src={value.avatar} alt="" />

              <div className="info">
                <h3 className="name text-dark">{value.name}</h3>
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
