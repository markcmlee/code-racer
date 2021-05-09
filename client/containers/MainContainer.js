import fetch from "node-fetch";
import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import CodeSnippet from "../components/CodeSnippet";
import InputField from "../components/InputField";
import { SnippetContext } from "../components/SnippetContext";

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

  const {
    chooseSnippet,
    snippet,
    snippetWords,
    meaning,
    lastInput,
  } = useContext(SnippetContext);

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

  // useEffect(() => {
  //   // console.log(snippetWords);
  //   // console.log(meaning);
  //   console.log(lastInput);
  // }, [lastInput]);

  return (
    <div>
      <NavBar
        raceStarted={raceStarted}
        categories={categories}
        fetchSnippet={throttle(fetchSnippet, 500)}
      />
      <CodeSnippet />
      <InputField
        toggleRaceStarted={() => setRaceStarted((el) => !el)}
        raceStarted={raceStarted}
      />
    </div>
  );
};

export default MainContainer;
