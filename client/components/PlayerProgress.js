import React, { useState, useEffect, useContext } from "react";
import { SnippetContext } from "./SnippetContext";

const PlayerProgress = (props) => {
  const { percentage } = useContext(SnippetContext);
  const backgroundColor = "#DF740C";

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor,
    borderRadius: "inherit",
    textAlign: "right",
    // textShadow: "-1px 1px 10px #ff4365",
    // boxShadow: "0px 0px 15px 2px #dd3b2f, inset 0px 0px 15px 1px #FF4365",
  };

  const labelStyles = {
    padding: 5,
    paddingRight: "10px",
    color: "white",
    fontWeight: "bold",
    userSelect: "none",
    fontFamily: "Nunito",
    fontSize: ".9rem",
    textShadow: "-1px 1px 10px #ff4365",
  };

  return (
    <div className="playerProgress">
      <div style={fillerStyles}>
        <span style={labelStyles}>Your Progress: {percentage.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default PlayerProgress;
