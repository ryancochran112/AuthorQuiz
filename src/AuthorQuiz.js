import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AuthorQuiz.css';
import Hero from './components/hero';
import Turn from './components/turn';
import Continue from './components/continue';
import Footer from './components/footer';
import { connect } from 'react-redux';
import AuthorService from './services/AuthorService';

export class AuthorQuiz extends React.Component {

  callApi = async () => {
    await AuthorService.callApi();
  }

  render() {
    setTimeout(() => { console.log('test fake timer'); }, 2000);
    return (
      <div className="containerFluid">
        <Hero />
        <Turn />
        <Continue />
        <br />
        <div id="footer" className="row">
          <strong className="col-md-4 col-md-offset-1"><Link to="/add">Add Author </Link> </strong>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(() => ({}), () => ({}))(AuthorQuiz));
