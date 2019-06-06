import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Dashboard from '../../components/Dashboard';
import * as routeTypes from '../../state/modules/routing';
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
import Searchbox from '../../components/Searchbox';
import {
	routeType,
	ROUTE_HOME,
	ROUTE_ABOUT,
	ROUTE_LOGIN,
	ROUTE_SIGNUP,
	ROUTE_ANONYMOUS,
	ROUTE_PEOPLE,
	ROUTE_BOOK_BORROW,
	ROUTE_BOOK
} from '../../state/modules/routing';

class Home extends Component {
  state = {
    openDrawer: false,
    type: null
  }

  componentDidMount() {
    const {fetchCategory, fetchClass, fetchPublishing, fetchStudent,fetchBook} = this.props;
    fetchBook();
    fetchCategory();
    fetchClass();
    fetchPublishing();
    fetchStudent()
  }

  componentDidUpdate() {
    const { type } = this.props;
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
        <Dashboard
          type={location.type} 
          routeTypes={routeTypes}
          loginStatus={loginStatus}
          {...remainProps}
        />
      </React.Fragment>
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
  publishingCompanies: state.publishing.publisingCompany
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  fetchClass:compose(dispatch, fetchClassSaga),
  fetchCategory:compose(dispatch, fetchCategorySaga),
  fetchPublishing:compose(dispatch, fetchPublishingSaga),
  fetchStudent:compose(dispatch, fetchStudentSaga),
  editStudent: compose(dispatch, editStudentSaga),
  addStudent: compose(dispatch, addStudentSaga),
  deleteStudent: compose(dispatch, deleteStudentSaga),
  fetchBook:compose(dispatch, fetchBookSaga),
  editBook: compose(dispatch, editBookSaga),
  addBook: compose(dispatch, addBookSaga),
  deleteBook: compose(dispatch, deleteBookSaga)
  
}))(Home);
