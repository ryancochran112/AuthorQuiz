export const ANSWER_SELECTED = "ANSWER_SELECTED";
export const CONTINUE_TURN = "CONTINUE_TURN";
export const ADD_AUTHOR = "ADD_AUTHOR";

export const addAuthor = (author) => ({
    type: ADD_AUTHOR,
    payload: author
  });

export const answerSelected = (answer) => ({
    type: ANSWER_SELECTED,
    payload: answer
  });

export const continueTurn = () => ({
    type: CONTINUE_TURN,
    payload: null
  });



