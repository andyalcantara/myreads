import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom';
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    wantToRead: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({
        currentlyReading: allBooks.filter(book => book.shelf === 'currentlyReading'),
        read: allBooks.filter(book => book.shelf === 'read'),
        wantToRead: allBooks.filter(book => book.shelf === 'wantToRead')
      });
      console.log(allBooks);
    });
  }

  moveBook = (book, toShelf) => {
    BooksAPI.update(book, toShelf).then((response) => {
      console.log(response, 'Update method from BooksApi');
    });
    if (toShelf === 'currentlyReading' || toShelf === 'read' || toShelf === 'wantToRead') {
      BooksAPI.getAll().then((allBooks) => {
        this.setState({
          currentlyReading: allBooks.filter(book => book.shelf === 'currentlyReading'),
          read: allBooks.filter(book => book.shelf === 'read'),
          wantToRead: allBooks.filter(book => book.shelf === 'wantToRead')
        });
      });   
    }
  }

  handleSearch = (event) => {
    if (event.target.value === '') {
      return;
    } else {
      BooksAPI.search(event.target.value).then((results) => {
        if (results.length > 0) {
          this.setState({
            searchedBooks: results
          });
          console.log(results);
        } else {
          return;
        }
      });
    }
  }

  render() {
    console.log(this.state.read, this.state.currentlyReading, this.state.wantToRead);
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author" onChange={this.handleSearch} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.searchedBooks.map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => this.moveBook(book, event.target.value)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <p className="book-authors">{book.authors}</p>
                      </div>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        )} />


        <Route exact path='/' render={() => (
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
                      {
                        this.state.currentlyReading.filter(book => {
                          return book.shelf === 'currentlyReading';
                        }).map(currentlyReadingBook => (
                          <li key={currentlyReadingBook.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${currentlyReadingBook.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={'none'} onChange={(event) => this.moveBook(currentlyReadingBook, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{currentlyReadingBook.title}</div>
                              <div className="book-authors">{currentlyReadingBook.authors}</div>
                            </div>
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.wantToRead.filter(book => {
                          return book.shelf === 'wantToRead';
                        }).map(wantToReadBook => (
                          <li key={wantToReadBook.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${wantToReadBook.imageLinks.thumbnail})`}}></div>
                                <div className="book-shelf-changer">
                                  <select value={'none'} onChange={(event) => this.moveBook(wantToReadBook, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{wantToReadBook.title}</div>
                              <div className="book-authors">{wantToReadBook.authors}</div>
                            </div>
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.read.filter(book => {
                          return book.shelf === 'read';
                        }).map(readBook => (
                          <li key={readBook.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${readBook.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={'none'} onChange={(event) => this.moveBook(readBook, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{readBook.title}</div>
                              <div className="book-authors">{readBook.authors}</div>
                            </div>
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
