import React, {Component} from 'react';

class Continue extends Component {
    render() {
        return (<div className="row continue"> 
            {
                this.props.show ?
                <div className="col-md-10 col-md-offset-1">
                    <button className = "btn btn-primary btn-lg btn-block" onClick={this.props.onContinue}>Continue</button>
                </div>
                : null
            }
        </div>);
    }
}

export default Continue;