import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './author-quiz.css';
import Hero from './hero';
import Turn from './turn';
import Continue from './continue';
import Footer from './footer';
import { connect } from 'react-redux';
import AuthorService from '../services/author.service';

export class AuthorQuiz extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      testFunctionCalled: false
    };
  }

  callApi = async () => {
    await AuthorService.callApi();
  }

  callPropFunction = () => {
    this.props.testFunction();
    this.setState({ testFunctionCalled: true });
  }

  render() {
    setTimeout(() => { console.log('test fake timer'); }, 2000);
    return (
      <div className="containerFluid">
        <Hero testFunction={this.props.testFunction} />
        <Turn />
        <Continue />
        <br />
        <div id="footer" className="row">
          <strong className="col-md-4 col-md-offset-1"><Link to="/add">Add Author </Link> </strong>
        </div>
        <Footer />
        <button className="test" onClick={this.props.testFunction}>Test</button>
      </div>
    );
  }
}

export default withRouter(connect(() => ({}), () => ({}))(AuthorQuiz));
