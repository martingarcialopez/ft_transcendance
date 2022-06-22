import React from "react";
import "../styles/repoCardStyles.css";
import { RiBookMarkLine } from "react-icons/ri";
import { MatchInfo } from "../redux/reducers/userReducers";

const RepoCard = (props: MatchInfo) => {
  return (
    <div className="repoCard">
      <div className="topSide">
        <header>
          <RiBookMarkLine className="icon" />
          {props.winner}
        </header>
        <p>{props.leftPlayer} vs {props.rightPlayer}</p>
        <p>{props.leftPlayerScore} vs {props.rightPlayerScore}</p>
        <p>Winner {props.winner}</p>
      </div>
    </div>
  );
};

export default RepoCard;
