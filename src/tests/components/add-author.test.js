import React from 'react';

// Mock Data
import { AUTHORS } from '../../mockdata/mockdata';
// Components
import AddAuthor from '../../components/add-author';
// Redux
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
// Router
import { MemoryRouter } from 'react-router'
// Enzyme
import { mount } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Routing', () => {

    it('should change routes when author is added and form submitted', () => {
      // Arrange
      const state = {
        authors: AUTHORS,
        turnData: {
          author: AUTHORS[0],
          books: AUTHORS[0].books
        },
        highlight: 'correct'
      };
      const store = mockStore(state);
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
      expect(wrapper.find('AddAuthor')).toHaveLength(1);
      // The "/" indicates the route should now be the root or home page.
      expect(wrapper.find('AddAuthor').props().location.pathname).toBe("/");
    });
  });