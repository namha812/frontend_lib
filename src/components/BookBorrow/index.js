import React, { Component } from 'react';
import ViewGridItem from '../ViewGridItem';
import Cart from '../Cart';
import { withStyles } from "@material-ui/core/styles";
import lodash from "lodash";
import {constants} from '../../containers/ToastNotification';
const styles = theme => ({
  card: {
    display: "flex",
    justifyContent: "space-between"
  },
  details: {
    maxWidth: 240,
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  badge: {
    top: 10,
    right: -10,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
      }`
  }
});

class BorrowBook extends Component {
  state = {
    selectedBook: [],
    open: false,
    currentBook: {},
    numberOfBook: 1,
    error: null
  }

  handerAddBook = () => {
    const { currentBook, numberOfBook, selectedBook } = this.state;
    const book = {
      ...currentBook,
      number: numberOfBook
    }
    this.setState(state => ({
      open: false,
      numberOfBook: null,
      selectedBook: [...state.selectedBook, book],
      currentBook: {}
    }));
  };
  componentDidUpdate() {

  }
  handleClose = () => {
    this.setState({
      open: false,
      numberOfBook: null,
      currentBook: {}
    });
  };

  onSelectedBook = (book) => {
    book.number = 1
    const { showToast } = this.props;
    const { selectedBook } = this.state
    let findBook = lodash.find(selectedBook, o => {
      return o.id === book.id
    })
    if (findBook) {
      const payload = {
        message: "Sách này đã có trong giỏ",
        action: "Dismiss",
        type: constants.FAILED
      }
      return showToast(payload);
    }
    if(book.quantity < 1) {
      const payload = {
        message: "Sách này đã hết trong kho",
        action: "Dismiss",
        type: constants.FAILED
      }
      return showToast(payload);
    }
    this.setState(state => ({
      ...state,
      currentBook: book,
      selectedBook: [...selectedBook, book],
      open: false
    }))
  }

  borrowBook = (data) => {
    const { borrowBook } = this.props;
    this.setState({ selectedBook: [] })
    borrowBook(data);
  }

  removeBook = (book) => {
    const { selectedBook, currentBook } = this.state;
    const newSelectedBook = selectedBook.filter(bookSelected => book.id !== bookSelected.id);
    this.setState({ selectedBook: newSelectedBook });
  }
  cancelCart = (book) => {
    this.setState({ selectedBook: [] });
  }

  render() {
    const { classes, books, students, searchValue } = this.props;
    const { selectedBook } = this.state;
    return (
      <div>
        <div className={classes.card}>
          <div>
            <ViewGridItem searchValue={searchValue} books={books} onSelectedBook={this.onSelectedBook} inBorrowTab />
          </div>
          <Cart borrowBook={this.borrowBook} students={students} selectedBook={selectedBook} removeBook={this.removeBook} onCancelClick={this.cancelCart} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BorrowBook);