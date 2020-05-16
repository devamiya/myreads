import React from 'react';

class Book extends React.Component {

  state = {
    value: this.props.shelf
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onMove(this.props.book, value);
  }

  render(){
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, 
            backgroundImage: `url(
              ${this.props.book.imageLinks?
                this.props.book.imageLinks.thumbnail:  
                'https://placeholder.pics/svg/200/7BFF3E-1FD8FF/2FFF39-08FF01/NA'})` 
          }}>
          </div>
          <div className="book-shelf-changer">
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {this.props.book.authors? this.props.book.authors.join(', ') : 'Unknown Author'}
        </div>
      </div>
    )
  }
  
}

export default Book;