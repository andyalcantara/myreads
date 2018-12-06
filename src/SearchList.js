import React, { Component } from 'react';
import SearchListItem from './SearchListItem';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';

class SearchList extends Component {

    state = {
        query: '',
        searchedBooks: []
    }

    handleSearch = (event) => {
        if (event.target.value === '') {
          this.setState({
              searchedBooks: []
          });
        } else {
            this.setState({
                query: event.target.value.trim()
            });
            BooksAPI.search(event.target.value).then((results) => {
                if (results.length > 0) {
                    this.setState({
                        searchedBooks: results
                    });
                }
            });
        }
      }

    render() {
       return (
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
                  this.state.searchedBooks.map(book => {
                    let image = ''
                    if (book.imageLinks) {
                      image = book.imageLinks.smallThumbnail;
                    } else {
                      image = '';
                    }

                    this.props.books.map(mybook => {
                        if (book.title === mybook.title) {
                            book.shelf = mybook.shelf;
                        } 
                        return true;
                    });

                        return (
                            <div key={book.id} >
                                <SearchListItem 
                                    id={book.id} 
                                    image={image} 
                                    value={book.shelf ? book.shelf : 'none'} 
                                    moveBook={this.props.moveBook} 
                                    title={book.title} 
                                    authors={book.authors} 
                                    book={book} 
                                />
                            </div>
                        )
                    })
                }
              </ol>
            </div>
          </div>
       );
    }
}

export default SearchList;