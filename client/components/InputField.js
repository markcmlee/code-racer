import React, { useState, useEffect, useContext } from "react";
import PlayerProgress from "./PlayerProgress";
import { SnippetContext } from "./SnippetContext";

const InputField = React.memo((props) => {
  const {
    snippet,
    checkInput,
    checkForError,
    setActiveRace,
    activeRace,
    setStartTime,
    setWPM,
  } = useContext(SnippetContext);
  const { raceStarted, setRaceStarted } = props;
  const [activeCountdown, setActiveCountdown] = useState(false);
  const [countDown, setCountDown] = useState(null);

  const disableTab = (e) => {
    if (e.key === "Tab") e.preventDefault();
  };

  // Begin Countdown and the useEffect below activate the 5 second timer to start the game
  const beginCountdown = () => {
    if (raceStarted || activeCountdown) return;
    setActiveCountdown((active) => (active = true));
    setRaceStarted(true);
    setCountDown(5);
  };

  useEffect(() => {
    if (activeCountdown) {
      document.getElementById("timer").innerHTML = `Starts in ... ${countDown}`;
      if (countDown === 0) {
        setCountDown(null);
        setActiveCountdown(false);
        setRaceStarted(false);
        document.getElementById("timer").innerHTML = `GO!`;
        setActiveRace({ boolean: true });
        const time = Date.now();
        setStartTime({ time });
      }
      if (!countDown) return;

      const intervalId = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [countDown]);

  // Conditional rendering of textArea depending on game state (active/inactive)
  let textArea;
  if (snippet.length !== 0) {
    textArea = (
      <textarea
        id="textInput"
        onFocus={beginCountdown}
        placeholder="Click here to start the race!"
        onKeyDown={(e) => disableTab(e)}
        onInput={(e) => {
          if (activeRace) {
            checkInput({ input: e.target.value });
            checkForError({ input: e });
            setWPM();
          }
        }}
        readOnly={!activeRace}
      ></textarea>
    );
  } else if (snippet.length !== 0 && activeCountDown) {
    textArea = (
      <textarea
        id="textInput"
        placeholder="GET READY!"
        onKeyDown={(e) => disableTab(e)}
        onInput={(e) => {
          checkInput({ input: e.target.value });
          checkForError({ input: e });
          setWPM();
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
});

export default InputField;
