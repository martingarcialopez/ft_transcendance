import "../styles/leaderboardStyles.css";

export const LeaderboardProfiles = ({ Leaderboard }: any) => {
    const Item = (data: any) => {
        return (
            <>
                {data.map((value: any, index: any) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={value.img} alt="" />

                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>
                                <span>{value.location}</span>
                            </div>
                        </div>
                        <div className="item">
                            <span>{value.score}</span>
                        </div>
                    </div>
                )
                )}
            </>
        )
    }

    return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
    )
}
