import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthor from './components/add-author';
import registerServiceWorker from './registerServiceWorker';
import { AUTHORS } from './mockdata/mockdata';
import { shuffle, sample } from 'underscore';

function getTurnData(authors) {
    console.log(authors);
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

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    console.log(state.highlight);
    render();
}

function onContinue() {
    state = resetState();
    render();
}

function resetState() {
    return {
        turnData: getTurnData(AUTHORS),
        highlight: ''
    }
}

let state = resetState();

function App () {
    return <AuthorQuiz turnData = {state.turnData} highlight = {state.highlight} onAnswerSelected = {onAnswerSelected} onContinue={onContinue}/>;
}

const AuthorWrapper = withRouter(({ history }) =>
    <AddAuthor onAddAuthor={(author) => {
        AUTHORS.push(author);
        console.log(AUTHORS);
        history.push('/');
    }} />
);

function render () {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path='/' component={App} />
            <Route exact path='/add' component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>, 
    document.getElementById('root'));
}

render();
registerServiceWorker();
