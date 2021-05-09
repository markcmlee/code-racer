import React, { useState, useEffect } from "react";

const NavBar = (props) => {
  const { categories, fetchSnippet } = props;

  const navCategories = categories.map((cat, i) => (
    <li
      className="disabled"
      key={`category${i}`}
      id={`category${i}`}
      onClick={fetchSnippet}
    >
      {cat}
    </li>
  ));

  return <ul id="categories">{navCategories}</ul>;
};

export default NavBar;
