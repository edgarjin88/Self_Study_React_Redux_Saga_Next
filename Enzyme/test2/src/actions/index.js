import { getLetterMatchCount } from "../helpers";

import axios from "axios";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",

  SET_SECRET_WORD: "SET_SECRET_WORD",
};

export const guessWord = (guessedWords) => {
  return function (dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWords, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWords, letterMatchCount },
    });

    if (guessedWords === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  };
};

export const getSecretWord = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3030").then((response) => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: response.data,
      });
    });
  };
};
