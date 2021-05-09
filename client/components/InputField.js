import React, { useState, useEffect, useContext } from "react";
import { SnippetContext } from "./SnippetContext";

const InputField = (props) => {
  const { snippet, checkForError } = useContext(SnippetContext);
  const { toggleRaceStarted, raceStarted } = props;
  const [activeCountdown, setActiveCountdown] = useState(false);
  const [countDown, setCountDown] = useState(null);

  const beginCountdown = () => {
    if (raceStarted || activeCountdown) return;
    setActiveCountdown((active) => (active = true));
    toggleRaceStarted();
    setCountDown(5);
  };

  useEffect(() => {
    if (activeCountdown) {
      document.getElementById("timer").innerHTML = `Starts in ... ${countDown}`;
      if (countDown == 0) {
        setCountDown(null);
        setActiveCountdown(false);
        toggleRaceStarted();
        document.getElementById("timer").innerHTML = `GO!`;
      }
      if (!countDown) return;

      const intervalId = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [countDown]);

  let textArea;
  if (snippet.length !== 0) {
    textArea = (
      <textarea
        id="textInput"
        onFocus={beginCountdown}
        placeholder="Click here to start the race!"
        onInput={(e) => {
          checkForError({ input: e.target.value });
        }}
      ></textarea>
    );
  } else {
    textArea = (
      <textarea
        id="textInput"
        placeholder="You need a code snippet to race"
        disabled
      ></textarea>
    );
  }

  return (
    <section className="inputContainer">
      <div id="timer"></div>

      {textArea}

      <p id="currentWPM"></p>
    </section>
  );
};

export default InputField;
