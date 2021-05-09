import React from "react";

const CodeSnippet = (props) => {
  const { chosenSnippet } = props;
  return (
    <div>
      <h2>THIS IS TEH CODESNIPPET COMPONENT</h2>
      <pre>
        <code class="language-plaintext">{chosenSnippet}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
