import React, { useContext, useEffect } from "react";
import PlayerProgress from "./PlayerProgress";
import { SnippetContext } from "./SnippetContext";

const CodeSnippet = (props) => {
  const {
    snippet,
    prevSnippet,
    completedWords,
    inputWord,
    snippetWords,
    raceFinished,
    meaning,
  } = useContext(SnippetContext);

  if (snippet.length === 0) {
    if (raceFinished === null || raceFinished === false) {
      return (
        <section id="snippet">
          <h3 className="crtSpecial" id="noText">
            Please select a category to get started...
          </h3>
        </section>
      );
    } else if (raceFinished) {
      return (
        <section id="snippetFinished">
          {prevSnippet && (
            <div className="leftCode">
              <h4>Finished Snippet:</h4>
              <pre>
                <code className="crtSpecial language-plaintext">
                  {prevSnippet}
                </code>
              </pre>
            </div>
          )}
          {meaning && (
            <code className="rightMeaning">
              <h4>What the Code Does: </h4>
              <p>{meaning}</p>
            </code>
          )}
        </section>
      );
    }
  }

  useEffect(() => {
    console.log("status of raceFinished", raceFinished);
    console.log("MEANING AT THE END", meaning);
  }, [raceFinished]);

  return (
    <pre id="snippet">
      <code className="crtSpecial language-plaintext">
        {snippetWords.map((word, wordIndex) => {
          let highlight = false;
          let currentWord = false;
          if (completedWords.length > wordIndex) highlight = true;
          if (completedWords.length === wordIndex) currentWord = true;

          return (
            <span
              className={`word
                    ${highlight && "green"}
                    ${currentWord && "underline"}
                  `}
              key={wordIndex}
            >
              {word.split("").map((letter, letterIndex) => {
                const isCurrentWord = wordIndex === completedWords.length;
                const shouldBeHighlighted = letterIndex < inputWord.length;
                const isWronglyTyped = letter !== inputWord[letterIndex];
                return (
                  <span
                    className={`letter ${
                      isCurrentWord && shouldBeHighlighted
                        ? isWronglyTyped
                          ? "red"
                          : "green"
                        : ""
                    }`}
                    key={letterIndex}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          );
        })}
      </code>
      <PlayerProgress />
    </pre>
  );
};

export default CodeSnippet;
