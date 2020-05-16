import React from 'react';
import BookSelf from './BookShelf';
import { Link } from 'react-router-dom';

const BookList = ({shelves, books, onMove }) => {

  const BookShelves = shelves.map(shelf => 
    <BookSelf key={shelf.id} shelf={shelf} books={books} onMove={onMove}/>
  )

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {BookShelves}
          </div>
          </div>
          <div className="open-search">
            <Link to="search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default BookList;