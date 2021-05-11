import React, { useState, useEffect, useContext } from "react";
import { SnippetContext } from "./SnippetContext";

const NavBar = (props) => {
  const { categories, raceStarted, fetchSnippet } = props;
  const { activeRace } = useContext(SnippetContext);

  let navCategories;

  if (!activeRace && !raceStarted) {
    navCategories = categories.map((category, i) => (
      <li
        className={"crtSpecial"}
        key={`category${i}`}
        id={`category${i}`}
        onClick={fetchSnippet}
      >
        {category}
      </li>
    ));
  } else {
    navCategories = categories.map((category, i) => (
      <li className="disabled" key={`category${i}`} id={`category${i}`}>
        {category}
      </li>
    ));
  }

  return (
    <nav className="navBar">
      <ul id="categories">{navCategories}</ul>
    </nav>
  );
};

export default NavBar;
