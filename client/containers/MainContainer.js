import fetch from "node-fetch";
import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import CodeSnippet from "../components/CodeSnippet";
import InputField from "../components/InputField";
import PlayerProgress from "../components/PlayerProgress";
import { SnippetContext } from "../components/SnippetContext";

// Basic throttle to limit the number of fetches to get a snippet
const throttle = (func, limit) => {
  let shouldWait;
  return function (...args) {
    if (!shouldWait) {
      func.apply(this, args);
      shouldWait = true;
      setTimeout(() => (shouldWait = false), limit);
    }
  };
};

const MainContainer = () => {
  const [categories, setCategories] = useState([]);
  const [raceStarted, setRaceStarted] = useState(false);

  const { chooseSnippet, activeRace } = useContext(SnippetContext);

  // Gets categories on load
  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
      });
  }, []);

  // Fetches and chooses and random snippet from clicked category
  const fetchSnippet = (e) => {
    fetch(`/api/snippet?id=${e.target.innerText}`)
      .then((res) => res.json())
      .then((res) => {
        const len = res.length;
        const random = Math.floor(Math.random() * len);
        chooseSnippet({
          snippet: res[random].content,
          meaning: res[random].meaning,
        });
      });
  };

  return (
    <div className="mainContainer">
      <h1 className="mainTitle">CODERACER</h1>
      <NavBar
        raceStarted={raceStarted}
        categories={categories}
        fetchSnippet={throttle(fetchSnippet, 500)}
      />
      <CodeSnippet />
      {/* <PlayerProgress /> */}
      <InputField setRaceStarted={setRaceStarted} raceStarted={raceStarted} />
    </div>
  );
};

export default MainContainer;
