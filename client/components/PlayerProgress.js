import React, { useState, useEffect, useContext } from "react";
import { SnippetContext } from "./SnippetContext";

const PlayerProgress = (props) => {
  const { percentage } = useContext(SnippetContext);
  const [backgroundColor, setBackgroundColor] = useState("blue");

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    paddingRight: "10px",
    color: "white",
    fontWeight: "bold",
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
