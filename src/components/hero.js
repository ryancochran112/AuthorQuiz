import React, {Component} from 'react';

class Hero extends Component {
    render() {
        return (<div className="row">
            <div className="jumbotron col-md-10 col-md-offset-1">
                <h1>Author Quiz</h1>
                <p>Select the book written by the author shown</p>
            </div>
        </div>);
    }   
}

export default Hero;