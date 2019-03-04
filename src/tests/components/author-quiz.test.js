import React from 'react';
import ReactDOM from 'react-dom';

// Mock Data
import { AUTHORS } from '../../mockdata/mockdata';
// Components
import { AuthorQuiz } from '../../components/author-quiz';
// Redux
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
// Router
import { MemoryRouter } from 'react-router'
// Enzyme
import { mount, shallow, render } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
// Services
import AuthorService from '../../services/author.service';


beforeAll(() => {
  global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn(() => Promise.resolve([])) }));
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

// Basic
describe("Basic", () => {
  it("Basic Test", () => {
    // Arrange
    const state = {
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'wrong'
    };
    const store = mockStore(state);
    const testFunction = jest.fn(); // mock function
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <AuthorQuiz testFunction={testFunction} />
        </MemoryRouter>
      </Provider>);
    const button = wrapper.find('.test-props'); //Add . in front for class names.

    // Act
    button.simulate('click');

    // Assert
    expect(testFunction).toHaveBeenCalledTimes(1);
  });
});

// Props
describe("Props And State", () => {
  it("Test Prop Function and State", () => {
    // Arrange
    const state = {
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'wrong'
    };
    const store = mockStore(state);
    const testFunction = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <AuthorQuiz testFunction={testFunction} />
        </MemoryRouter>
      </Provider>);
    const authorQuiz = wrapper.find('AuthorQuiz').instance();
    const hero = wrapper.find('Hero');

    // Act
    authorQuiz.callPropFunction();

    // Assert
    expect(testFunction).toHaveBeenCalledTimes(1);
    expect(authorQuiz.state.testFunctionCalled).toBeTruthy();
    expect(hero.prop('testFunction')).toBe(testFunction);
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
    };
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
    jest.runOnlyPendingTimers(); //comment this line out and the test will fail.

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('test fake timer');
  });
});

// APIs
describe("Api tests", () => {

  it("Api Call", async () => {
    // Arrange
    const authorServiceSpy = jest.spyOn(AuthorService, 'callApi');
    const state = {
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'wrong'
    };
    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <AuthorQuiz />
        </MemoryRouter>
      </Provider>);
    const authorQuiz = wrapper.find('AuthorQuiz');

    // Act
    await authorQuiz.instance().callApi();

    // Assert
    expect(authorServiceSpy).toHaveBeenCalledTimes(1);
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

});
