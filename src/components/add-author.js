import React, {Component} from 'react';
import './add-author.css';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { addAuthor } from '../actions/authors.actions';

function mapDispatchToProps(dispatch, props) {
    return { 
        onAddAuthor: (author) => {
            console.log(author);
            dispatch(addAuthor(author));
            props.history.push('/');
        }
    };
  }

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name' : '',
            'imageUrl' : '',
            'books' : [],
            'bookTemp' : '',
            'errors' : { name: '', imageUrl: ''},
            'touched' : { name: false, imageUrl: false}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.addBook = this.addBook.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setErrors = this.setErrors.bind(this);
    }

    onBlur (event) {
        this.setState({
            touched: { ...this.state.touched, [event.target.name]: true }
        });
        this.validateForm(event);
    }
    
    validateForm (event) {
        this.setState({
            [event.target.name] : event.target.value
        });
        if (!event.target.value) {
            this.setErrors(event.target.name, [event.target.name] + ' is required');
        } else {
            this.setErrors(event.target.name, '');
        }
    }

    setErrors (inputName, error) {
        this.setState({
            errors: { ...this.state.errors, [inputName] : error }
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
            <form onSubmit={this.onSubmit}>
                <div className= "form-group row">
                    <label className="col-md-1" htmlFor="name">Name</label>
                    <div className="col-md-11">
                        <input className={this.state.errors.name && this.state.touched.name ? "form-control error" : "form-control"} type = "text" name="name" value={this.state.name} onBlur={this.onBlur} onChange={this.validateForm}/>
                        {this.state.errors.name && this.state.touched.name ? <span className="text-danger">{this.state.errors.name}</span> : ''}
                    </div>
                </div>
                <div className= "form-group row">
                    <label className="col-md-1" htmlFor="imageUrl">Image Url</label>
                    <div className="col-md-11">
                        <input className={this.state.errors.imageUrl && this.state.touched.imageUrl  ? "form-control error" : "form-control"} type = "text" name="imageUrl" value={this.state.imageUrl} onBlur={this.onBlur} onChange={this.validateForm}/>
                        {this.state.errors.imageUrl && this.state.touched.imageUrl ? <span className="text-danger">{this.state.errors.imageUrl}</span> : ''}
                    </div>
                </div>
                <div className= "form-group">
                    <label className="col-md-1" htmlFor="bookTemp">Books</label>
                    <div className="input-group">
                    <input className="form-control" type ="text" name="bookTemp" value={this.state.bookTemp} onBlur={this.onBlur} onChange={this.validateForm}/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={this.addBook}>Add Book</button>
                        </span>
                    </div>
                    <div className="col-md-offset-1">
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    </div>
                </div>
                <div className= "form-group row pull-right">
                    <input disabled={this.state.books.length < 1 || this.state.name.length < 1 || this.state.imageUrl.length < 1} className="btn btn-primary float-right" type ="submit" value="Add Author" onClick={() => {this.props.onAddAuthor({name: this.state.name, imageUrl: this.state.imageUrl, books: this.state.books})}}/>
                </div>
            </form>
        </div>);
    }
}

export default withRouter(connect(() => ({}), mapDispatchToProps) (AddAuthor));