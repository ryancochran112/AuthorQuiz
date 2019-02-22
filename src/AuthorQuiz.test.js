import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AUTHORS } from './mockdata/mockdata';
// Components
import { AuthorQuiz } from './AuthorQuiz';
import AddAuthor from './components/add-author';
// Redux
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// Actions
import { answerSelected, ADD_AUTHOR, ANSWER_SELECTED, CONTINUE_TURN } from './actions/authors.actions';
// Reducers
import authorsReducer from './reducers/authors.reducer';
// Router
import { MemoryRouter } from 'react-router'
// Enzyme
configure({ adapter: new Adapter() });

// Mock Redux Store
const mockStore = configureStore();

beforeAll(() => {
  console.log('before all');
});

afterAll(() => {
  jest.clearAllTimers();
  console.log('after all');
});

// Filters
describe("Test Filters", () => {

  beforeEach(() => {
    console.log('each');
  });

  it("Test 1", () => {
  });
  it("Test 2", () => {
  });
});

// Equality
describe("Equality", () => {
  it("Test 1", () => {
    const num1 = 1;
    const num1Copy = 1;
    expect(num1).toBe(num1Copy);
    expect(num1).toEqual(num1Copy);
  });
  it("Test 2", () => {
    const obj1 = { test: "2" };
    const obj1Copy = { test: "2" };
    // expect(obj1).toBe(obj1Copy);
    expect(obj1).toEqual(obj1Copy);
  });
});

// Timers
describe("Fake Timers", () => {

  it("Timed log", () => {
    // Arrange
    let consoleSpy;
    const state = {
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'wrong'
    }

    const store = mockStore(state);
    consoleSpy = jest.spyOn(global.console, 'log');
    jest.useFakeTimers();
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <AuthorQuiz />
        </MemoryRouter>
      </Provider>);
    // Act
    jest.runOnlyPendingTimers();
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('test fake timer');
  });
});

// APIs
describe("Api tests", () => {
  let wrapper;
  let consoleSpy;
  const apiError = "error";

  const state = {
    turnData: {
      author: AUTHORS[0],
      books: AUTHORS[0].books
    },
    highlight: 'wrong'
  };

  const store = mockStore(state);

  it("Api Fail", async () => {
    // Arrange
    global.fetch = jest.fn(() => Promise.reject(apiError));
    consoleSpy = jest.spyOn(global.console, 'error');
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <AuthorQuiz />
        </MemoryRouter>
      </Provider>);
    const authorQuiz = wrapper.find('AuthorQuiz');

    // Act
    await authorQuiz.instance().callApi();

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(apiError);
  });

  it("Api Success", async () => {
    // Arrange
    const data = ['test 1', 'test 2'];
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn(() => Promise.resolve(data)) }));
    consoleSpy = jest.spyOn(global.console, 'log');
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <AuthorQuiz />
        </MemoryRouter>
      </Provider>);
    const authorQuiz = wrapper.find('AuthorQuiz');

    // Act
    await authorQuiz.instance().callApi();
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(data);
  });
});

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
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <AuthorQuiz />
        </MemoryRouter>
      </Provider>, div);
    // Assert
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('When no answer is selected', () => {
    // Arrange
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
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <AuthorQuiz />
          </MemoryRouter>
        </Provider>);
    });

    it('should have no background color', () => {
      // Assert
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background', '');
    });
  });

  describe('When wrong answer is selected', () => {
    // Arrange
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
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <AuthorQuiz />
          </MemoryRouter>
        </Provider>);
    });

    it('should have red background color', () => {
      // Assert
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background', 'red');
    });
  });

  describe('When correct answer is selected', () => {
    // Arrange
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
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <AuthorQuiz />
          </MemoryRouter>
        </Provider>);
    });

    it('should have green background color', () => {
      // Assert
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background', 'green');
    });
  });

  describe('Reducers', () => {
    // Arrange
    const state = {
      authors: AUTHORS,
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'correct'
    }

    it('should return the initial state', () => {
      // Assert
      expect(authorsReducer(undefined, {}).authors).toEqual(AUTHORS);
      expect(authorsReducer(undefined, {}).highlight).toEqual('');
    });

    it('Adding an Author Reducer test', () => {
      // Act
      var result = authorsReducer(state, {
        type: ADD_AUTHOR,
        payload: { name: 'Ryan', imageUrl: '/testimage.jpg', books: ['James is cool!'] }
      }).authors;
      // Assert
      expect(result.length).toBe(AUTHORS.length + 1);
      expect(result.filter(author => author.name === 'Ryan' && author.imageUrl === '/testimage.jpg').length).toBe(1);
    });
  });

  describe('Routing', () => {
    let store;
    beforeAll(() => {
      // Arrange
      const state = {
        authors: AUTHORS,
        turnData: {
          author: AUTHORS[0],
          books: AUTHORS[0].books
        },
        highlight: 'correct'
      }
      store = mockStore(state);
    });

    it('should change routes when author is added and form submitted', () => {
      // Arrange
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/add', '/']} initialIndex={0}>
            <AddAuthor />
          </MemoryRouter>
        </Provider>);
      const preventDefault = jest.fn();
      // Act
      wrapper.find('form').simulate('submit', { preventDefault });
      // Assert
      expect(preventDefault).toBeCalled();
      // expect(wrapper.find('AddAuthor')).toHaveLength(1);
      // The "/" indicates the route should now be the root or home page.
      expect(wrapper.find('AddAuthor').props().location.pathname).toBe("/");
    });
  });

});
