import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchBooks from './SearchBooks'


class App extends React.Component {
  
  state = {
    myBooks:[],
    searchBooks:[],
    error: false,
    showSearchPage: false
  }

  shelves = [
    { id: 1, name: 'Currently Reading', key: 'currentlyReading' },
    { id: 2, name: 'Want to Read', key: 'wantToRead' },
    { id: 3, name: 'Read', key: 'read' }
  ];

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });
    if (shelf === 'none') {
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };

  searchBooks = (query) =>{
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };

  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ myBooks: books });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  render() {
    return (
    <div className="app">
      <Route
          exact
          path="/"
          render={() => (
            <BookList
              shelves={this.shelves}
              books={this.state.myBooks}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              searchBooks={this.state.searchBooks}
              myBooks={this.state.myBooks}
              onSearch={this.searchBooks}
              onMove={this.moveBook}
              onResetSearch={this.resetSearch}
            />
          )}
        />    
    </div>
   )
  }
}

export default App
