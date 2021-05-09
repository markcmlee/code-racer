import React, { useContext } from "react";
import { SnippetContext } from "./SnippetContext";

const CodeSnippet = (props) => {
  const { snippet } = useContext(SnippetContext);
  if (snippet.length === 0) {
    return (
      <section className="snippetContainer">
        <div id="snippet">
          <p className="crtSpecial" id="noText">
            Please select a category to get started...
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="snippetContainer">
      <pre id="snippet">
        <code className="crtSpecrial language-plaintext">{snippet}</code>
      </pre>
    </section>
  );
};

export default CodeSnippet;
