import React, { Component } from 'react';
import './App.scss';
import Routes from '../../rootRouter'
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchStudentSaga,
  addStudentSaga,
  editStudentSaga,
  deleteStudentSaga
} from '../../state/modules/student'
import {
  fetchBookSaga,
  addBookSaga,
  editBookSaga,
  deleteBookSaga
} from '../../state/modules/book';
import {
  checkLogin
} from '../../state/modules/auth'
import {
  fetchClassSaga
} from '../../state/modules/class'
import {
  fetchCategorySaga
} from '../../state/modules/category'
import {
  fetchPublisherSaga
} from '../../state/modules/publisher'
import Searchbox from '../../components/Searchbox';
import {
  ROUTE_HOME,
  ROUTE_PEOPLE,
  ROUTE_BOOK_BORROW,
  ROUTE_BOOK
} from '../../state/modules/routing';

class App extends Component {
  componentDidMount() {
    const {checkLogin} = this.props;
    checkLogin();
  }
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}
export default connect(state => ({
  loginStatus: state.auth.loginStatus,
  location: state.location,
  route: state.location.type,
  student: state.student,
  categories: state.category.categories,
  classList: state.classes.classes,
  books: state.book.books,
  publisherCompanies: state.publisher.publiserCompany
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  checkLogin: compose(dispatch, checkLogin),
  fetchClass: compose(dispatch, fetchClassSaga),
  fetchCategory: compose(dispatch, fetchCategorySaga),
  fetchPublisher: compose(dispatch, fetchPublisherSaga),
  fetchStudent: compose(dispatch, fetchStudentSaga),
  editStudent: compose(dispatch, editStudentSaga),
  addStudent: compose(dispatch, addStudentSaga),
  deleteStudent: compose(dispatch, deleteStudentSaga),
  fetchBook: compose(dispatch, fetchBookSaga),
  editBook: compose(dispatch, editBookSaga),
  addBook: compose(dispatch, addBookSaga),
  deleteBook: compose(dispatch, deleteBookSaga)

}))(App);

