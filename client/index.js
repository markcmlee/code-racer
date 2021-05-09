import React from "react";
import { render } from "react-dom";
import App from "./App";
import { SnippetProvider } from "./components/SnippetContext";
import styles from "./scss/application.scss";

render(
  <SnippetProvider>
    <App />
  </SnippetProvider>,
  document.querySelector("#root")
);
