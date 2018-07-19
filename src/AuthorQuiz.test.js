import 'raf/polyfill';
import React from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import ReactDOM from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-dom';
import {mount, shallow, render } from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/enzyme'
import { configure } from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/enzyme';
import Adapter from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/enzyme-adapter-react-16';
import { AUTHORS } from './mockdata/mockdata';
import { AuthorQuiz } from './AuthorQuiz';
import { MemoryRouter } from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-router'

configure({ adapter: new Adapter() });

const state = {
  turnData: {
    author: AUTHORS[0],
    books: AUTHORS[0].books
  },
  highlight: 'none'
}

describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
        <AuthorQuiz turnData = {state.turnData} highlight = {state.highlight} onAnswerSelected = {() => {}} />
    </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('When no answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
          <AuthorQuiz turnData = {state.turnData} highlight = {state.highlight} onAnswerSelected = {() => {}} />
      </MemoryRouter>);
    });
    
    it('should have no background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','');
    });
  });

  describe('When wrong answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
          <AuthorQuiz turnData = {state.turnData} highlight = {'wrong'} onAnswerSelected = {() => {}} />
      </MemoryRouter>);
    });
    
    it('should have red background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','red');
    });
  });

  describe('When correct answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
          <AuthorQuiz turnData = {state.turnData} highlight = {'correct'} onAnswerSelected = {() => {}} />
      </MemoryRouter>);
    });
    
    it('should have green background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','green');
    });
  });

  describe('When the first answer is selected', () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
          <AuthorQuiz turnData = {state.turnData} highlight = {state.highlight} onAnswerSelected = {handleAnswerSelected} />
        </MemoryRouter>);
      wrapper.find('.answer').first().simulate('click');
    });
    
    it('onAnswerSelected should be called', () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it('should receive The Adventures of Huckleberry Finn', () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith(AUTHORS[0].books[0]);
    });

  });

});
