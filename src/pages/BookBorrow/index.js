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
  fetchPublishingSaga
} from '../../state/modules/publishing'
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

class BookBorrowPage extends Component {
  state = {
    openDrawer: false,
    type: null
  }

  componentDidMount() {
    const {fetchCategory, fetchStudent, fetchPublishing, fetchBook} = this.props;
    fetchBook();
    fetchStudent();
    fetchCategory();
    fetchPublishing();
  }

  recallApi = (route) => {

  }

  onChangeRoute = (route) => {
    const { redirect } = this.props;
    redirect(route);
    this.recallApi(route);
  }

  onCloseDrawer = (event) => {
    this.setState({ openDrawer: false });
  }

  onOpenDrawer = () => {
    this.setState({ openDrawer: true })
  }

  onChangeSearchValue = (value) => {
    const {location} = this.props;
    switch (location.type) {
			case ROUTE_HOME:
        //callSearchBookApi();
        break;
			case ROUTE_BOOK_BORROW:
        //callSearchBookApi();
        break;
      case ROUTE_PEOPLE:
        //call searchpeopleApi();
        break;
			case ROUTE_BOOK:
        //callSearchBookApi();
        break;
      default:
        break;
		};
  }
  render() {
    const { openDrawer } = this.state
    const { 
      location,
      loginStatus,
      ...remainProps
    } = this.props;
    console.log(this.props)
    return (
      <React.Fragment>
        <Appbar loginStatus={loginStatus} openDrawer={this.onOpenDrawer} />
        <Drawer loginStatus={loginStatus} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
        <Searchbox loginStatus={loginStatus} placeholder="Search" onChangeSearchValue={this.onChangeSearchValue}/>
        <BorrowBook {...remainProps} />
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
  publishingCompanies: state.publishing.publisingCompany,
  students: state.student.students
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  borrowBook: compose(dispatch, borrowBookSaga),
  fetchStudent:compose(dispatch, fetchStudentSaga),
  fetchClass:compose(dispatch, fetchClassSaga),
  fetchCategory:compose(dispatch, fetchCategorySaga),
  fetchPublishing:compose(dispatch, fetchPublishingSaga),
  fetchBook:compose(dispatch, fetchBookSaga),
  editBook: compose(dispatch, editBookSaga),
  addBook: compose(dispatch, addBookSaga),
  deleteBook: compose(dispatch, deleteBookSaga)
}))(BookBorrowPage);
