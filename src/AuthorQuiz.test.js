import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AUTHORS } from './mockdata/mockdata';
import { AuthorQuiz } from './AuthorQuiz';
import { MemoryRouter } from 'react-router'
// Redux
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// Actions
import { answerSelected, ADD_AUTHOR, ANSWER_SELECTED, CONTINUE_TURN } from './actions/authors.actions';
// Reducers
import authorsReducer from './reducers/authors.reducer';

// Enzyme
configure({ adapter: new Adapter() });

// Mock Redux Store
const mockStore = configureStore();

describe('Author Quiz', () => {
  beforeEach(() => { // Runs before each test in the suite
    // store.clearActions();
  });

  it('renders without crashing', () => {
    // Arrange
    const state = {
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'none'
    }
    
    const store = mockStore(state);
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
          <AuthorQuiz />
      </MemoryRouter>
    </Provider>, div);
    // Assert
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('When no answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      const state = {
        turnData: {
          author: AUTHORS[0],
          books: AUTHORS[0].books
        },
        highlight: 'none'
      }
      
      const store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
            <AuthorQuiz />
        </MemoryRouter>
      </Provider>);
    });
    
    it('should have no background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','');
    });
  });

  describe('When wrong answer is selected', () => {
    const state = {
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'wrong'
    }
    
    const store = mockStore(state);
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
            <AuthorQuiz />
        </MemoryRouter>
      </Provider>);
    });
    
    it('should have red background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','red');
    });
  });

  describe('When correct answer is selected', () => {
    const state = {
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'correct'
    }
    
    const store = mockStore(state);
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
            <AuthorQuiz />
        </MemoryRouter>
      </Provider>);
    });
    
    it('should have green background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','green');
    });
  });

  describe('Reducers', () => {
    const state = {
      authors: AUTHORS,
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'correct'
    }
    
    it('should return the initial state', () => {
      expect(authorsReducer(undefined, {}).authors).toEqual(AUTHORS);
      expect(authorsReducer(undefined, {}).highlight).toEqual('');
    });

    it('Adding an Author', () => {
      // Act
      var result = authorsReducer(state, {
        type: ADD_AUTHOR,
        payload: {name: 'Ryan', imageUrl: '/testimage.jpg', books: ['James is cool!']}
      }).authors;
      // Assert
      expect(result.length).toBe(AUTHORS.length + 1);
      expect(result.filter(author => author.name === 'Ryan' && author.imageUrl === '/testimage.jpg').length).toBe(1);
    });
  });

});
