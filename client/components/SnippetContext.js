import React, { useReducer, createContext, useCallback } from "react";
import id from "uuid/v4";
export const SnippetContext = createContext();

const CHOOSE_SNIPPET = "CHOOSE_SNIPPET";
const CHECK_INPUT = "CHECK_INPUT";
const CHECK_FOR_ERROR = "CHECK_FOR_ERROR";
const TOGGLE_ACTIVE_RACE = "TOGGLE_ACTIVE_RACE";
const SET_START_TIME = "SET_START_TIME";
const SET_WPM = "SET_WPM";

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
  percentage: 0,
  raceFinished: null,
  activeRace: false,
  prevSnippet: "",
  WPM: 0,
  startTime: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === CHOOSE_SNIPPET) {
    let { snippet, meaning } = action.payload;
    const array = snippet.split(" ");
    return {
      ...state,
      snippet,
      raceFinished: false,
      snippetWords: array,
      remainingWords: array,
      currentWord: array[0],
      meaning,
    };
  }
  if (action.type === TOGGLE_ACTIVE_RACE) {
    let { boolean } = action.payload;
    return {
      ...state,
      activeRace: boolean,
    };
  }
  if (action.type === SET_START_TIME) {
    const { time } = action.payload;
    return {
      ...state,
      startTime: time,
    };
  }
  if (action.type === SET_WPM) {
    const { completedWords, startTime } = state;
    const inputLength = completedWords.reduce(
      (acc, curr) => (acc += curr.length),
      0
    );
    let words = inputLength / 5;
    let elapsedTime = Date.now() - startTime;
    let minute = 60000;
    let wpm = ((words * minute) / elapsedTime).toFixed(2);
    return {
      ...state,
      WPM: wpm,
    };
  }
  if (action.type === CHECK_INPUT) {
    let { input } = action.payload;
    return {
      ...state,
      inputWord: input,
      lastInput: input[input.length - 1],
    };
  }
  if (action.type === CHECK_FOR_ERROR) {
    const {
      lastInput,
      inputWord,
      currentWord,
      completedWords,
      remainingWords,
      snippetWords,
      snippet,
      WPM,
    } = state;

    // ON WIN CONDITION: Resets state
    if (remainingWords.length === 1) {
      if (inputWord.trim() === currentWord.trim()) {
        document.getElementById("textInput").value = "";
        document.getElementById("timer").innerHTML = `FINAL WPM: ${WPM}`;
        return {
          ...initialState,
          prevSnippet: snippet,
          raceFinished: true,
          meaning: state.meaning,
          playerId: state.playerId,
          percentage: 0,
        };
      }
    }

    // Skips to the next word if currentWord is a tab or indent indicating whitespace
    if (currentWord === "" || currentWord === "\n") {
      let completed = [...completedWords, currentWord];
      let remaining = [...remainingWords.slice(1)];
      return {
        ...state,
        remainingWords: remaining,
        completedWords: completed,
        currentWord: remaining[0],
        percentage: (completed.length / snippetWords.length) * 100,
      };
    }

    // If the last input is a space or Enter key press, check the word against current word
    if (lastInput === " " || lastInput === "\n") {
      if (inputWord.trim() === currentWord.trim()) {
        // const remainingWords = [...snippetWords.slice(1)];
        const remaining = [...remainingWords.slice(1)];
        const completed = [...completedWords, currentWord];
        // clear the textArea
        document.getElementById("textInput").value = "";
        return {
          ...state,
          remainingWords: remaining,
          completedWords: completed,
          currentWord: remaining[0],
          percentage: (completed.length / snippetWords.length) * 100,
        };
      }
    }

    return {
      ...state,
    };
  }
};

export const SnippetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const checkInput = useCallback(
    ({ input }) => {
      dispatch({
        type: CHECK_INPUT,
        payload: {
          input,
        },
      });
    },
    [dispatch]
  );

  const checkForError = useCallback(
    ({ event }) => {
      dispatch({
        type: CHECK_FOR_ERROR,
        payload: {
          event,
        },
      });
    },
    [dispatch]
  );

  const setActiveRace = useCallback(
    ({ boolean }) => {
      dispatch({
        type: TOGGLE_ACTIVE_RACE,
        payload: {
          boolean,
        },
      });
    },
    [dispatch]
  );

  const setStartTime = useCallback(
    ({ time }) => {
      dispatch({
        type: SET_START_TIME,
        payload: {
          time,
        },
      });
    },
    [dispatch]
  );

  const setWPM = useCallback(() => {
    dispatch({
      type: SET_WPM,
      payload: {},
    });
  }, [dispatch]);

  return (
    <SnippetContext.Provider
      value={{
        ...state,
        chooseSnippet,
        checkInput,
        checkForError,
        setActiveRace,
        setStartTime,
        setWPM,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
