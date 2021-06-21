import fetch from "node-fetch";
import React, { useState, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
import NavBar from "../components/NavBar";
import CodeSnippet from "../components/CodeSnippet";
import InputField from "../components/InputField";
import PlayerProgress from "../components/PlayerProgress";
import { SnippetContext } from "../components/SnippetContext";

// const socket = io.connect();
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
  const { chooseSnippet } = useContext(SnippetContext);

  // socket.on("newScores", (scores) => {
  //   // update scores
  // });

  // socket.on("mySocketId", (socketId) => {
  //   console.log("my socket id", socketId);
  // });

  // Gets categories on load
  useEffect(() => {
    fetch("/api/", {
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // setCategories(res.map((el) => el["category"]));
        setCategories(res);
      });
  }, []);

  // Fetches and chooses and random snippet from clicked category
  const fetchSnippet = (e) => {
    fetch(`/api/snippet?id=${e.target.innerText}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const len = res.length;
        const random = Math.floor(Math.random() * len);
        chooseSnippet({
          snippet: res[random].content,
          meaning: res[random].meaning,
        });
      });
  };

  return (
    <div className="crt mainContainer">
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
