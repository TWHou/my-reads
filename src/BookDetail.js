import React, { Component } from 'react';
import { get } from './BooksAPI';
import './BookDetail.css'

class BookDetail extends Component {
  state = {
    book: {
      title: "",
      imageLinks: {
        thumbnail:""
      },
      authors: [""],
      description: ""
    }
  }

  componentDidMount() {
    get(this.props.match.params.id).then(book => {
      this.setState({ book })
    })
  }
  
  
  render() {
    const book = this.state.book
    console.info(book)
    return (
      <div>
        <div className="list-books-title">
          <h1>{book.title}</h1>
        </div>
        <div className="f-col">
          <img src={book.imageLinks.thumbnail} alt={book.title}/>
          <p>Author(s): {book.authors.reduce((prev, curr) => prev + ', ' + curr)}</p>
          <p>Description:</p>
          <p>{book.description}</p>
        </div>
      </div>
    );
  }
}

export default BookDetail;