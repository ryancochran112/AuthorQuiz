import React, { Component } from 'react';
import { connect } from 'react-redux';
import { continueTurn } from '../actions/author.action';

function mapStateToProps(state) {
    return {
        highlight: state.highlight
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onContinue: () => {
            dispatch(continueTurn())
        }
    };
}

class Continue extends Component {
    render() {
        return (<div className="row continue">
            {
                this.props.highlight === 'correct' ?
                    <div className="col-md-10 col-md-offset-1">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.props.onContinue}>Continue</button>
                    </div>
                    : null
            }
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Continue);