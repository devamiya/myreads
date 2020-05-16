import React from 'react'
import Book from './Book'

const BookShelf = ({books, shelf, onMove}) => {

  const filterBooks = books.filter(book=> book.shelf === shelf.key)

  const BooksOnSelf = filterBooks.map(book => 
    <li key={book.id}>
      <Book book={book} shelf={shelf.key} onMove={onMove}/>
    </li>
  )

  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {BooksOnSelf}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default BookShelf;
