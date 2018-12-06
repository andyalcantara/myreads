import React from 'react';

const SearchListItem = (props) => {
    return (
        <li key={props.id}>
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.image})` }}></div>
                <div className="book-shelf-changer">
                <select defaultValue={props.defaultValue} value={props.value} onChange={(event) => props.moveBook(props.book, event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            <p className="book-authors">{props.authors}</p>
            </div>
        </li>
    );
}

export default SearchListItem;