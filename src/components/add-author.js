import React, {Component} from 'react';
import './add-author.css';

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name' : '',
            'imageUrl' : '',
            'books' : [],
            'bookTemp' : ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    addBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }

    render() {
        return (<div className="add-author">
            <h1>Add Author</h1>
            <form onSubmit={this.onSubmit}>
                <div className= "add-author-input">
                    <label htmlFor="name">Name</label>
                    <input type = "text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
                </div>
                <div className= "add-author-input">
                    <label htmlFor="imageUrl">Image Url</label>
                    <input type = "text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
                </div>
                <div className= "add-author-input">
                    <label htmlFor="bookTemp">Books</label>
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <input type = "text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                    <input type ="button" value="Add Book" onClick={this.addBook}/>
                </div>
                <input type ="submit" value="Add Author"/>
            </form>
        </div>);
    }
}

export default AddAuthor;