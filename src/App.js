import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom';
import './App.css'
import BooksList from './BooksList';
import SearchList from './SearchList';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    read: [],
    wantToRead: [],
    searchedBooks: [],
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({
        books: allBooks,
        currentlyReading: allBooks.filter(book => book.shelf === 'currentlyReading'),
        read: allBooks.filter(book => book.shelf === 'read'),
        wantToRead: allBooks.filter(book => book.shelf === 'wantToRead')
      });
      console.log(allBooks);
    });
  }

  moveBook = (book, toShelf) => {
    BooksAPI.update(book, toShelf).then((response) => {
      console.log(response);
      if (response.currentlyReading.length !== this.state.currentlyReading || response.read.length !== this.state.read || response.wantToRead !== this.state.wantToRead) {
        BooksAPI.getAll().then(allBooks => {
          this.setState({
            currentlyReading: allBooks.filter(book => book.shelf === 'currentlyReading'),
            read: allBooks.filter(book => book.shelf === 'read'),
            wantToRead: allBooks.filter(book => book.shelf === 'wantToRead')
          });
        });
      }
    });
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
          <SearchList books={this.state.books} moveBook={this.moveBook} />
  
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
                  
                  <BooksList bookShelf={this.state.currentlyReading} shelf={'currentlyReading'} moveBook={this.moveBook} />
                  
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>

                  <BooksList bookShelf={this.state.wantToRead} shelf={'wantToRead'} moveBook={this.moveBook} />
                  
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>

                  <BooksList bookShelf={this.state.read} shelf={'read'} moveBook={this.moveBook} />
                  
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
