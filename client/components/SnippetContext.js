import React, { useReducer, createContext, useCallback } from "react";
import id from "uuid/v4";
export const SnippetContext = createContext();

const CHOOSE_SNIPPET = "CHOOSE_SNIPPET";
const CHECK_FOR_ERROR = "CHECK_FOR_ERROR";

const initialState = {
  snippet: "",
  snippetWords: [],
  meaning: "",
  playerId: "",
  completedWords: [],
  incorrect: [],
  complete: "",
  currentWord: "",
  inputWord: "",
  lastInput: "",
};

const reducer = (state = initialState, action) => {
  if (action.type === CHOOSE_SNIPPET) {
    let { snippet, meaning } = action.payload;
    return {
      snippet,
      snippetWords: snippet.trim().split(/[ \t]+/),
      meaning,
    };
  }
  if (action.type === CHECK_FOR_ERROR) {
    let { input } = action.payload;
    console.log("THIS IS THE INPUT", input);
    return {
      lastInput: input,
      ...state,
    };
  }

  return state;
};

export const SnippetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    snippet,
    snippetWords,
    completedWords,
    incorrect,
    complete,
    meaning,
    inputWord,
    lastInput,
  } = state;

  const chooseSnippet = useCallback(
    ({ snippet, meaning }) => {
      dispatch({
        type: CHOOSE_SNIPPET,
        payload: {
          snippet,
          meaning,
        },
      });
    },
    [dispatch]
  );

  const checkForError = useCallback(
    ({ input }) => {
      dispatch({
        type: CHECK_FOR_ERROR,
        payload: {
          input,
        },
      });
    },
    [dispatch]
  );

  return (
    <SnippetContext.Provider
      value={{
        snippet,
        snippetWords,
        completedWords,
        incorrect,
        complete,
        meaning,
        lastInput,
        inputWord,
        chooseSnippet,
        checkForError,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
