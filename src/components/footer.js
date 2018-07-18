import React, {Component} from 'react';

class Footer extends Component {
    render(){
        return (<div id = "footer" className= "row">
            <div className="col-md-12 col-md-offset-1">
            <br/>
                <p className="text-muted credit">All images are from a public domain </p>
            </div>
        </div>
        );
    }
}

export default Footer;