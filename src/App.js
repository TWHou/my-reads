import React from 'react'
import { Route, Link } from 'react-router-dom'
import Shelf from './Shelf'
import Search from './Search'
import { getAll } from './BooksAPI'
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

  getBooks = () => {
    getAll().then(data => {
      this.setState({books: data})
    })
  }

  componentDidMount() {
    this.getBooks()
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
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf 
                  title="Currently Reading" 
                  books={currentlyReading} 
                  onUpdate={(book, shelf)=>{
                    this.updateBook(book, shelf)
                  }}
                />
                <Shelf 
                  title="Want to Read" 
                  books={wantToRead} 
                  onUpdate={(book, shelf)=>{
                    this.updateBook(book, shelf)
                  }}
                />
                <Shelf 
                  title="Read" 
                  books={read} 
                  onUpdate={(book, shelf)=>{
                    this.updateBook(book, shelf)
                  }}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => <Search finished={this.getBooks} />}/>        
      </div>
    )
  }
}

export default BooksApp
