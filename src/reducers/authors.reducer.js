import { AUTHORS } from '../mockdata/mockdata';
import { shuffle, sample } from 'underscore';
import { ADD_AUTHOR, ANSWER_SELECTED, CONTINUE_TURN } from '../actions/authors.actions';

const defaultState = {
    authors: AUTHORS,
    turnData: getTurnData(AUTHORS),
    highlight: ''
};

const authorsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ANSWER_SELECTED:
            const isCorrect = state.turnData.author.books.some((book) => book === action.payload);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
        case CONTINUE_TURN :
            return Object.assign({}, state, {highlight: '', turnData: getTurnData(state.authors)});
        case ADD_AUTHOR :
            const authors = state.authors.concat([action.payload]);
            return Object.assign({}, state, {authors: authors , turnData: getTurnData(authors)});
        default:
            return state;
    }
}

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c) {
        return p.concat(c.books);
    }, [])
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
                author.books.some((title) => 
                title === answer))
    }
}

export default authorsReducer;