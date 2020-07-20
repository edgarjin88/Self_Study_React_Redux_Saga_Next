import { getLetterMatchCount } from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
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
