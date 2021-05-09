import fetch from "node-fetch";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import CodeSnippet from "../components/CodeSnippet";
import InputField from "../components/InputField";

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
  const [chosenCategory, setChosenCategory] = useState(null);
  const [chosenSnippet, setChosenSnippet] = useState(null);

  // Gets categories on load
  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((res) => {
        setCategories((el) => res);
      });
  }, []);

  // Fetches and chooses and random snippet from clicked category
  const fetchSnippet = (e) => {
    setChosenCategory(e.target.innerText);
    fetch(`/api/snippet?id=${e.target.innerText}`)
      .then((res) => res.json())
      .then((res) => {
        const len = res.length;
        const random = Math.floor(Math.random() * len);
        setChosenSnippet((el) => res[random].content);
      });
  };

  return (
    <div>
      <h1>THIS IS THE MAIN CONTAINER</h1>
      <NavBar
        categories={categories}
        fetchSnippet={throttle(fetchSnippet, 500)}
      />
      <CodeSnippet chosenSnippet={chosenSnippet} />
      <InputField />
    </div>
  );
};

export default MainContainer;
