import React from 'react';
import ReactDOM from 'react-dom';

// Mock Data
import { AUTHORS } from '../../mockdata/mockdata';
// Components
import { AuthorQuiz } from './author-quiz';
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

// Basic Constructs
describe("Test Filters", () => {

  beforeEach(() => {
    console.log('each');
  });

  it("Test 1", () => {
    expect(1).toBe(1);
  });
  it("Test 2", () => {
    expect(2).toBe(2);
  });
});

// Basic
describe("Basic", () => {
  it("Basic Test", () => {
    // Arrange
    const loadAuthorsMock = jest.fn();
    const testFunction = jest.fn();

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
          <AuthorQuiz testFunction={testFunction} loadAuthors={loadAuthorsMock} />
        </MemoryRouter>
      </Provider>);
    const button = wrapper.find('.test-props'); //Add . in front for class names.

    // Act
    button.simulate('click');

    // Assert
    expect(testFunction).toHaveBeenCalledTimes(1);
    expect(loadAuthorsMock).toHaveBeenCalled();
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
          <AuthorQuiz testFunction={testFunction} loadAuthors={jest.fn()} />
        </MemoryRouter>
      </Provider>);
      
    const authorQuiz = wrapper.find('AuthorQuiz');
    const hero = wrapper.find('Hero');

    // Act
    authorQuiz.instance().callPropFunction();
    wrapper.update();

    // Assert
    expect(testFunction).toHaveBeenCalledTimes(1);
    expect(hero.prop('testFunction')).toBe(testFunction);
    expect(authorQuiz.instance().state.showTestSpan).toBeTruthy();
    expect(wrapper.find('.test-span').length).toBe(1);
  });
});

// Mock State
describe("State", () => {
  it("Test State", () => {
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
          <AuthorQuiz testFunction={testFunction} loadAuthors={jest.fn()} />
        </MemoryRouter>
      </Provider>);

      const authorQuiz = wrapper.find('AuthorQuiz');
      authorQuiz.instance().setState({showTestSpan: true});

    // Act
    wrapper.update();

    // Assert
    expect(wrapper.find('.test-span').length).toBe(1);
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
          <AuthorQuiz loadAuthors={jest.fn()} />
        </MemoryRouter>
      </Provider>);
      const authorQuiz = wrapper.find('AuthorQuiz');

    // Act
    authorQuiz.instance().testTimer();
    jest.runOnlyPendingTimers(); //comment this line out and the test will fail.

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('test fake timer');
  });
});

// APIs
describe("Api tests", () => {
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
        <AuthorQuiz loadAuthors={jest.fn()} />
      </MemoryRouter>
    </Provider>);
  const authorQuiz = wrapper.find('AuthorQuiz');

  it("Api Call Success", async () => {
    // Arrange
    const expectedData = ['test 1', 'test 2'];
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn(() => Promise.resolve(expectedData)) }));
    const consoleSpy = jest.spyOn(global.console, 'log');

    // Act
    await authorQuiz.instance().callApi();

    // Assert
    expect(authorServiceSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(expectedData);
  });

  it("Api Call Fail", async () => {
    // Arrange
    const apiError = "error";
    global.fetch = jest.fn(() => Promise.reject(apiError));
    const authorServiceSpy = jest.spyOn(AuthorService, 'callApi');
    const consoleSpy = jest.spyOn(global.console, 'error');

    // Act
    await authorQuiz.instance().callApi();

    // Assert
    expect(authorServiceSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(apiError);
  });

});

describe('Author Quiz', () => {

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
          <AuthorQuiz loadAuthors={jest.fn()} />
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
            <AuthorQuiz loadAuthors={jest.fn()} />
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
            <AuthorQuiz loadAuthors={jest.fn()} />
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
            <AuthorQuiz loadAuthors={jest.fn()} />
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
