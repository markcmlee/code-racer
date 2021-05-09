import React, { useState, useEffect } from "react";

const NavBar = (props) => {
  const { categories, raceStarted, fetchSnippet } = props;

  let navCategories;

  if (!raceStarted) {
    navCategories = categories.map((category, i) => (
      <li key={`category${i}`} id={`category${i}`} onClick={fetchSnippet}>
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
