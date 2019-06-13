import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Searchbox from '../../components/Searchbox';
import BorrowMangement from '../../components/BorrowMangement'
import * as routeTypes from '../../state/modules/routing';
import {
  fetchBorrow,
  fetchBorrowSaga,
  payBookSaga
} from '../../state/modules/borrow/index'
import {
  ROUTE_HOME,
  ROUTE_PEOPLE,
  ROUTE_BOOK_BORROW,
  ROUTE_BOOK
} from '../../state/modules/routing';
import {logoutSaga} from '../../state/modules/auth';


class BorrowMangementPage extends Component {
  state = {
    openDrawer: false,
    type: null,
    searchValue: ''
  }

  componentDidMount() {
    document.title = "Quản lý sách";
    const { loginStatus, fetchBorrow, borrowList = [] } = this.props;
    if(loginStatus && !borrowList.length) {
      fetchBorrow();
    }
  }

  componentDidUpdate() {
    const { type } = this.props;
    const { loginStatus, fetchBorrow, borrowList = [] } = this.props;
    if(loginStatus && !borrowList.length) {
      fetchBorrow();
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
        <BorrowMangement searchValue={searchValue} {...remainProps} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  borrowList: state.borrow.borrows,
  loginStatus: state.auth.loginStatus,
  location: state.location,
  route: state.location.type, //connect the reducer into your view
}), (dispatch) => ({ //connect and dispatch your action to call into your reducer - remember your payload.
  redirect: (route) => dispatch({
    type: route
  }),
  fetchBorrow: compose(dispatch, fetchBorrowSaga),
  payBook: compose(dispatch, payBookSaga),
  logout: compose(dispatch, logoutSaga)

}))(BorrowMangementPage);

