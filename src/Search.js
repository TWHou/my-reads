import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import Book from './Book';

class Search extends Component {
  state = {
    query: '',
    books: []
  }
  
  updateQuery= query => {
    if (query) {
      this.setState({query: query.trim()})
      search(query, 10).then(books => {
        this.setState({ books })
      })
    } else {
      this.setState({books: []})
    }
  }

  updateBook = (book) => {
    let currentBooks = this.state.books
    for (let i in currentBooks) {
      if (currentBooks[i].id === book.id) {
          currentBooks.splice(i, 1)
          break
      }
    }
    this.setState({books: currentBooks})
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={this.props.finished}>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search Topic or Subject"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book book={book} onSaveBook={(book, shelf)=>{
                  this.updateBook(book)
                }} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;