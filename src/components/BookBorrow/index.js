import React, { Component } from 'react';
import ViewGridItem from '../ViewGridItem';
import Cart from '../Cart';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";

import Searchbox from '../Searchbox';

const styles = theme => ({
  card: {
    display: "flex",
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
    numberOfBook: null,
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
  componentDidMount(){
    
  }
  handleClose = () => {
    this.setState({
      open: false,
      numberOfBook: null,
      currentBook: {}
    });
  };

  onChangeNumber = (event) => {
    const { currentBook } = this.state;
    const { value } = event.target;
    if(value > currentBook.quantity) {
      this.setState({error: "So luong sach nhieu hon"})
    }
    else {
      this.setState({error: null})
    }
    this.setState({ numberOfBook: value })
  }

  onSelectedBook = (book) => {
    this.setState(state => ({
      ...state,
      currentBook: book,
      open: true
    }))
  }

  borrowBook = (data) => {
    const {borrowBook} = this.props;
    this.setState({selectedBook: []})
    borrowBook(data);
  }

  removeBook = (book) => {
    const { selectedBook, currentBook } = this.state;
    const newSelectedBook = selectedBook.filter(bookSelected => book.id !== bookSelected.id);
    this.setState({ selectedBook: newSelectedBook });
  }

  render() {
    const { classes, books, students, searchValue } = this.props;
    const { selectedBook, currentBook, numberOfBook,error } = this.state;
    return (
      <div>
        <div className={classes.card}>
          <div>
            <ViewGridItem searchValue={searchValue} books={books} onSelectedBook={this.onSelectedBook} inBorrowTab />
          </div>
          <Cart borrowBook={this.borrowBook} students={students} selectedBook={selectedBook} removeBook={this.removeBook} />
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Muon sach</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ban chuan bi cho muon sach {currentBook.name}. Hay nhap so luong sach ban muon muon:
            </DialogContentText>
            <TextField
              autoFocus
              error={error}
              margin="dense"
              id="name"
              label="So luong"
              type="number"
              value={numberOfBook}
              fullWidth
              onChange={this.onChangeNumber}
            />
            <div>{error}</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Huy
            </Button>
            <Button onClick={this.handerAddBook} color="primary" disabled={error}>
              Them
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BorrowBook);