import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './components/author-quiz/author-quiz';
import AddAuthor from './components/add-author/add-author';
import registerServiceWorker from './registerServiceWorker';
import authorsReducer from './reducers/author.reducer';
// Redux
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

let store = Redux.createStore(authorsReducer, Redux.applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.Fragment>
                <Route exact path='/'
                    render={(props) => <AuthorQuiz {...props} testFunction={() => { console.log('test function called.'); }} />} />
                <Route exact path='/add'
                    component={AddAuthor} />
            </React.Fragment>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));


registerServiceWorker();
