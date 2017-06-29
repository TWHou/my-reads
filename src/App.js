import React from 'react'
import { Route, Link } from 'react-router-dom'
import Book from './Book'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({books: data})
    })
  }
  
  updateBook(book, shelf) {
    let currentBooks = this.state.books
    for (let i in currentBooks) {
      if (currentBooks[i].id === book.id) {
          currentBooks[i].shelf = shelf
          break
      }
    }
    this.setState({books: currentBooks})
  }

  render() {
    const currentlyReading = this.state.books.filter(
      book => book.shelf === 'currentlyReading'
    )
    const wantToRead = this.state.books.filter(
      book => book.shelf === 'wantToRead'
    )
    const read = this.state.books.filter(
      book => book.shelf === 'read'
    )
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReading.map(book => (
                        <li key={book.id}>
                          <Book book={book} onSaveBook={(book, shelf)=>{
                            this.updateBook(book, shelf)
                          }} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wantToRead.map(book => (
                        <li key={book.id}>
                          <Book book={book} onSaveBook={(book, shelf)=>{
                            this.updateBook(book, shelf)
                          }} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {read.map(book => (
                        <li key={book.id}>
                          <Book book={book} onSaveBook={(book, shelf)=>{
                            this.updateBook(book, shelf)
                          }} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" component={Search}/>        
      </div>
    )
  }
}

export default BooksApp
