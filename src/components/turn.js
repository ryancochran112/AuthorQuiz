import React, { Component } from 'react';
import Book from './book';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { answerSelected } from '../actions/author.action';


function mapStateToProps(state) {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAnswerSelected: (answer) => {
            dispatch(answerSelected(answer));
        }
    };
}

class Turn extends Component {

    highlightBackground(highlight) {
        const mapping = {
            'none': '',
            'correct': 'green',
            'wrong': 'red'
        };

        return mapping[highlight];
    }

    render() {
        let content = <div></div>;
        if (this.props.turnData) {
            content = (<div className="row turn" style={{ background: this.highlightBackground(this.props.highlight) }}>
                <div className="col-md-4 col-md-offset-1">
                    <img src={this.props.turnData.author.imageUrl} className="authorimage" alt="Author" />
                </div>
                <div className="col-md-6">
                    {this.props.turnData.books.map((title) => <Book key={title} title={title} onAnswerSelected={this.props.onAnswerSelected}>{title}</Book>)}
                </div>
            </div>);
        }
        return content;
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

export default connect(mapStateToProps, mapDispatchToProps)(Turn);