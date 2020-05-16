import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book'

class SearchBooks extends React.Component {

  state = {
    value: '',
  }
  myBookids = [];

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value }, () => {
      this.props.onSearch(value);
    });
  };

  render(){

    this.props.myBooks.forEach(book => {
      this.myBookids.push(book.id)
    });

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search" onClick={this.props.onResetSearch}>
                Close
              </button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                value={this.state.value}
                placeholder="Search by title or author"
                onChange={this.handleChange}
                autoFocus
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              { 
              this.props.searchBooks.filter(b=> !this.myBookids.includes(b.id)).map(book => (
                <Book
                  key={book.id}
                  book={book}
                  shelf={book.shelf ? book.shelf : 'none'}
                  onMove={this.props.onMove}
                />
              ))
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks