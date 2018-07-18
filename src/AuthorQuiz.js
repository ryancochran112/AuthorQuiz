import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AuthorQuiz.css';
import Hero from './components/hero';
import Turn from './components/turn';
import Continue from './components/continue';
import Footer from './components/footer';

class AuthorQuiz extends Component {
  render() {
    return (
      <div className = "containerFluid">
        <Hero />
        <Turn turnData = {this.props.turnData} highlight = {this.props.highlight} onAnswerSelected = {this.props.onAnswerSelected} />
        <Continue show={this.props.highlight === 'correct'} onContinue={this.props.onContinue}/>
        <br/>
        <div id = "footer" className= "row">
        <strong className = "col-md-4 col-md-offset-1"><Link to="/add">Add Author </Link> </strong>
        </div>
        <Footer/>
      </div>
    );
  }
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

export default AuthorQuiz;
