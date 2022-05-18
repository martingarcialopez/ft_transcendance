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
        <p>{props.player1} vs {props.player2}</p>
        <p>3 vs {props.scoreLoser}</p>
      </div>
    </div>
  );
};

export default RepoCard;
