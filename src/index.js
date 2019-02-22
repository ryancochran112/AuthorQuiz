import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthor from './components/add-author';
import registerServiceWorker from './registerServiceWorker';
import authorsReducer from './reducers/authors.reducer';
// Redux
import * as Redux from 'redux';
import { Provider } from 'react-redux';

let store = Redux.createStore(authorsReducer);

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
