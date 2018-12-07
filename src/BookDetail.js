import React from 'react';
import * as BooksAPI from './BooksAPI';

class BookDetail extends React.Component {

    state = {
        book: {}
    }

    componentDidMount() {
        BooksAPI.get(this.props.match.params.id).then(detailBook => {
            this.setState({
                book: detailBook
            });
        });
    }

    render() {
        let image = '';
        if (Object.keys(this.state.book).length > 0) {
            image = this.state.book.imageLinks.thumbnail;
        } else {
            image = '';
        }
        return (
            <div className="app">
                <h2 style={{marginLeft: 100}}>Book Details</h2>
                <hr/>
                <h2 style={{marginLeft: 400}}>Description</h2>
                <div style={{width: '100%', marginLeft: 150, marginTop: 20}} className="bookshelf">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image}` }}></div>
                        <p style={{width: '60%', height: 180, marginLeft: 80}}>{this.state.book.description}</p>
                    </div>
                    <div className="book-title" style={{width: '10%'}}>{this.state.book.title}</div>
                    <div className="book-authors" style={{width: '10%'}}>{this.state.book.authors}</div>
                    <div style={{marginTop: 30}}>
                        <a style={{border: '2px solid green', borderRadius: 5, textDecoration: 'none', color: 'green'}} href={this.state.book.infoLink}>Google Books Info</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookDetail;