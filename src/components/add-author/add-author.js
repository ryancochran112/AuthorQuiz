import React, { Component } from 'react';
import './add-author.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAuthor } from '../../actions/author.action';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';


const required = (value) => {
    if (!value.toString().trim().length) {
        return <span className="error">Field Required</span>
    }
};

const isNotNumber = (value) => {
    if (parseInt(value)) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return <span className="error">Must not be a number</span>
    }
};

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'imageUrl': '',
            'books': [],
            'bookTemp': ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.addBook = this.addBook.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    addBook() {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }

    render() {
        return (<div className="add-author">
            <h1 className="col-md-offset-5">Add Author</h1>
            <Form onSubmit={this.onSubmit}>
                <div className="form-group row">
                    <label className="col-md-1" htmlFor="name">Name</label>
                    <div className="col-md-11">
                        <Input className="form-control" type="text" name="name" value={this.state.name} onChange={this.onFieldChange} validations={[required, isNotNumber]} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-1" htmlFor="imageUrl">Image Url</label>
                    <div className="col-md-11">
                        <input className="form-control" type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-1" htmlFor="bookTemp">Books</label>
                    <div className="input-group">
                        <input className="form-control" type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={this.addBook}>Add Book</button>
                        </span>
                    </div>
                    <div className="col-md-offset-1">
                        {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    </div>
                </div>
                <div className="form-group row pull-right">
                    <Button className="btn btn-primary float-right" type="submit" onClick={() => { this.props.onAddAuthor({ name: this.state.name, imageUrl: this.state.imageUrl, books: this.state.books }) }}>Add Author</Button>
                </div>
            </Form>
        </div>);
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: (author) => {
            console.log(author);
            dispatch(addAuthor(author));
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => ({}), mapDispatchToProps)(AddAuthor));