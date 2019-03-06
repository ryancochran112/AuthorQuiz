import { ADD_AUTHOR, ANSWER_SELECTED, CONTINUE_TURN, LOAD_AUTHORS_FAIL, LOAD_AUTHORS_SUCCESS } from '../actions/author.action';
import { getTurnData } from '../helpers/turndata.helper';

const defaultState = {
    authors: undefined,
    turnData: undefined,
    highlight: ''
}

const authorsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ANSWER_SELECTED:
            const isCorrect = state.turnData.author.books.some((book) => book === action.payload);
            return Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' });
        case CONTINUE_TURN:
            return Object.assign({}, state, { highlight: '', turnData: getTurnData(state.authors) });
        case ADD_AUTHOR:
            const authors = state.authors.concat([action.payload]);
            return Object.assign({}, state, { authors: authors, turnData: getTurnData(authors) });
        case LOAD_AUTHORS_SUCCESS:
            return Object.assign({}, state, { authors: action.payload, turnData: getTurnData(action.payload) });
        case LOAD_AUTHORS_FAIL:
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}

export default authorsReducer;