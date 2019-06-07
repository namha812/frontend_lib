import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import BookMangement from '../../components/BookMangement';
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
} from '../../state/modules/publisher';
import Searchbox from '../../components/Searchbox';
import {
  ROUTE_HOME,
  ROUTE_PEOPLE,
  ROUTE_BOOK_BORROW,
  ROUTE_BOOK
} from '../../state/modules/routing';
import {logoutSaga} from '../../state/modules/auth';


class BookMangementPage extends Component {
  state = {
    openDrawer: false,
    type: null,
    searchValue: ""
  }

  componentDidMount() {
    const {fetchCategory, fetchPublisher, fetchBook} = this.props;
    fetchBook();
    fetchCategory();
    fetchPublisher();
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
    this.setState({
      searchValue: value
    })
  }
  render() {
    const { openDrawer, searchValue } = this.state
    const {
      location,
      loginStatus,
      ...remainProps
    } = this.props;
    return (
      <React.Fragment>
        <Appbar logout={this.props.logout} loginStatus={loginStatus} openDrawer={this.onOpenDrawer} />
        <Drawer loginStatus={loginStatus} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
        <Searchbox loginStatus={loginStatus} placeholder="Search" onChangeSearchValue={this.onChangeSearchValue} />
        <BookMangement
          searchValue={searchValue}
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
  publisherHouses: state.publisher.publisherHouses
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),

  fetchClass:compose(dispatch, fetchClassSaga),
  fetchCategory:compose(dispatch, fetchCategorySaga),
  fetchPublisher:compose(dispatch, fetchPublisherSaga),
  fetchBook:compose(dispatch, fetchBookSaga),
  editBook: compose(dispatch, editBookSaga),
  addBook: compose(dispatch, addBookSaga),
  deleteBook: compose(dispatch, deleteBookSaga),
  logout: compose(dispatch, logoutSaga)

}))(BookMangementPage);
