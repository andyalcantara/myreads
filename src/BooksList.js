import React from 'react';
import { Link } from 'react-router-dom';

const BookList = (props) => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                props.bookShelf.filter(book => {
                    return book.shelf === props.shelf;
                }).map(currentlyReadingBook => (
                    <li key={currentlyReadingBook.id}>
                    <div className="book">
                        <div className="book-top">
                            <Link to={'/book-detail/' + currentlyReadingBook.id}>
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${currentlyReadingBook.imageLinks.thumbnail})` }}></div>
                            </Link>
                            <div className="book-shelf-changer">
                                <select value={currentlyReadingBook.shelf} onChange={(event) => props.moveBook(currentlyReadingBook, event.target.value)}>
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
    );
}

export default BookList;