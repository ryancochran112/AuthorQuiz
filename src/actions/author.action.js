import AuthorService from '../services/author.service';

export const ANSWER_SELECTED = "ANSWER_SELECTED";
export const CONTINUE_TURN = "CONTINUE_TURN";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const CALL_API_SUCCESS = "CALL_API_SUCCESS";
export const CALL_API_FAIL = "CALL_API_FAIL";

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

export const callApi = () => {
  return async (dispatch) => {
    try {
      const data = await AuthorService.callApi();
      dispatch(callApiSuccess(data));
    } catch (e) {
      dispatch(callApiFail(e))
    }
  };
}

export const callApiSuccess = (data) => ({
  type: CALL_API_SUCCESS,
  payload: data
});

export const callApiFail = (e) => ({
  type: CALL_API_FAIL,
  payload: e
});


