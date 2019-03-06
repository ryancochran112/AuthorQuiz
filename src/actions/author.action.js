import AuthorService from '../services/author.service';

export const ANSWER_SELECTED = "ANSWER_SELECTED";
export const CONTINUE_TURN = "CONTINUE_TURN";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
export const LOAD_AUTHORS_FAIL = "LOAD_AUTHORS_FAIL";

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

export const loadAuthors = () => {
  return async (dispatch) => {
    try {
      const authors = await AuthorService.callApi();
      dispatch(loadAuthorsSuccess(authors));
    } catch (e) {
      dispatch(loadAuthorsFail(e))
    }
  };
}

export const loadAuthorsSuccess = (authors) => ({
  type: LOAD_AUTHORS_SUCCESS,
  payload: JSON.parse(authors)
});

export const loadAuthorsFail = (e) => ({
  type: LOAD_AUTHORS_FAIL,
  payload: e
});


