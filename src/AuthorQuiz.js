import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AuthorQuiz.css';
import Hero from './components/hero';
import Turn from './components/turn';
import Continue from './components/continue';
import Footer from './components/footer';
import { connect } from 'react-redux';

export class AuthorQuiz extends Component {
  render() {
    return (
      <div className = "containerFluid">
        <Hero />
        <Turn />
        <Continue />
        <br/>
        <div id = "footer" className= "row">
        <strong className = "col-md-4 col-md-offset-1"><Link to="/add">Add Author </Link> </strong>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(() => ({}), () => ({}))(AuthorQuiz));
