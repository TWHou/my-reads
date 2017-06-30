import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { update } from './BooksAPI';

class Book extends Component {
  handleSelect = event => {
    const selectedShelf = event.target.value
    update(this.props.book, selectedShelf).then(result => {
      if (this.props.onSaveBook){
        this.props.onSaveBook(this.props.book, selectedShelf)
      }
    })
  }
  render() {
    const book = this.props.book
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleSelect} value={book.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          <Link to={`/${book.id}`}>
            {book.title}
          </Link>
        </div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
};

export default Book;