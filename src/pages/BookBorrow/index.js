import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import BorrowBook from '../../components/BookBorrow'
import {
  fetchBookSaga,
  addBookSaga,
  editBookSaga,
  deleteBookSaga
} from '../../state/modules/book'
import {
  fetchClassSaga
} from '../../state/modules/class'
import {
  fetchCategorySaga
} from '../../state/modules/category'
import {
  fetchPublisherSaga
} from '../../state/modules/publisher'
import {
  fetchStudentSaga
} from '../../state/modules/student'
import Searchbox from '../../components/Searchbox';
import {
	ROUTE_HOME,
	ROUTE_PEOPLE,
	ROUTE_BOOK_BORROW,
	ROUTE_BOOK
} from '../../state/modules/routing';
import BookBorrow from '../../components/BookBorrow';
import { borrowBookSaga } from '../../state/modules/borrow';
import {logoutSaga} from '../../state/modules/auth';

class BookBorrowPage extends Component {
  state = {
    openDrawer: false,
    type: null,
    searchValue: ""
  }

  componentDidMount() {
    const {fetchCategory, fetchStudent, fetchPublisher, fetchBook, fetchedBookStatus, 
      fetchedCategoryStatus, fetchedPublisherStatus, fetchedStudentStatus, loginStatus} = this.props;
    document.title = "Mượn sách";
    if(loginStatus) {
      if(!fetchedBookStatus) {
        fetchBook();
      }
      if(!fetchedCategoryStatus) {
        fetchCategory();
      }
      if(!fetchedPublisherStatus) {
        fetchPublisher();
      }
      if(!fetchedStudentStatus) {
        fetchStudent();
      }
    }
  }

  componentDidUpdate(){
    const {fetchCategory, fetchStudent, fetchPublisher, fetchBook, fetchedBookStatus, 
      fetchedCategoryStatus, fetchedPublisherStatus, fetchedStudentStatus, loginStatus} = this.props;
    if(loginStatus) {
      if(!fetchedBookStatus) {
        fetchBook();
      }
      if(!fetchedCategoryStatus) {
        fetchCategory();
      }
      if(!fetchedPublisherStatus) {
        fetchPublisher();
      }
      if(!fetchedStudentStatus) {
        fetchStudent();
      }
    }
  }

  onChangeRoute = (route) => {
    const { redirect } = this.props;
    redirect(route);
  }

  onCloseDrawer = (event) => {
    this.setState({ openDrawer: false });
  }

  onOpenDrawer = () => {
    this.setState({ openDrawer: true })
  }

  onChangeSearchValue = (value) => {
    this.setState({
      searchValue: value
    })
  }
  render() {
    const { openDrawer,searchValue } = this.state
    const { 
      location,
      loginStatus,
      ...remainProps
    } = this.props;
    return (
      <React.Fragment>
        <Appbar logout={this.props.logout} loginStatus={loginStatus} openDrawer={this.onOpenDrawer} />
        <Drawer  loginStatus={loginStatus} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
        <Searchbox loginStatus={loginStatus} placeholder="Search" onChangeSearchValue={this.onChangeSearchValue}/>
        <BorrowBook searchValue={searchValue} {...remainProps} />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  loginStatus: state.auth.loginStatus,
  location: state.location,
  route: state.location.type,
  categories: state.category.categories,
  books: state.book.books,
  publisherHouse: state.publisher.publisherHouse,
  students: state.student.students,
  fetchedBookStatus: state.book.fetched,
  fetchedStudentStatus: state.student.fetched,
  fetchedCategoryStatus: state.category.fetched,
  fetchedPublisherStatus: state.publisher.fetched
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  borrowBook: compose(dispatch, borrowBookSaga),
  fetchStudent:compose(dispatch, fetchStudentSaga),
  fetchClass:compose(dispatch, fetchClassSaga),
  fetchCategory:compose(dispatch, fetchCategorySaga),
  fetchPublisher:compose(dispatch, fetchPublisherSaga),
  fetchBook:compose(dispatch, fetchBookSaga),
  editBook: compose(dispatch, editBookSaga),
  addBook: compose(dispatch, addBookSaga),
  deleteBook: compose(dispatch, deleteBookSaga),
  logout: compose(dispatch, logoutSaga)
}))(BookBorrowPage);
