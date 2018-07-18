import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AUTHORS } from './mockdata/mockdata';


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
    ReactDOM.render(<AuthorQuiz turnData = {state.turnData} highlight = {state.highlight} onAnswerSelected = {() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('When no answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz turnData = {state.turnData} highlight = {state.highlight} onAnswerSelected = {() => {}} />);
    });
    
    it('should have no background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','');
    });
  });

  describe('When wrong answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz turnData = {state.turnData} highlight = {'wrong'} onAnswerSelected = {() => {}} />);
    });
    
    it('should have red background color', () => {
      expect(wrapper.find('.row.turn').length).toBe(1);
      expect(wrapper.find('.row.turn').get(0).props.style).toHaveProperty('background','red');
    });
  });

  describe('When correct answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz turnData = {state.turnData} highlight = {'correct'} onAnswerSelected = {() => {}} />);
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
      wrapper = mount(<AuthorQuiz turnData = {state.turnData} highlight = {state.highlight} onAnswerSelected = {handleAnswerSelected} />);
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
