import { ADD_AUTHOR, ANSWER_SELECTED, CONTINUE_TURN, CALL_API_FAIL, CALL_API_SUCCESS } from '../actions/author.action';
import { getTurnData } from '../helpers/turndata.helper';
import { AUTHORS } from '../mockdata/mockdata';

const defaultState = {
    authors: AUTHORS,
    turnData: getTurnData(AUTHORS),
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
        case CALL_API_SUCCESS:
        case CALL_API_FAIL:
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}

export default authorsReducer;