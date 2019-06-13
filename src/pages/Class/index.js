import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Searchbox from '../../components/Searchbox';
import Class from '../../components/Class';
import * as routeTypes from '../../state/modules/routing';
import {
  fetchClassSaga,
  editClassSaga,
  addClassSaga
} from '../../state/modules/class';
import { logoutSaga } from '../../state/modules/auth';


class ClassPage extends Component {
  state = {
    openDrawer: false,
    type: null,
    searchValue: ""
  }
  onCloseDrawer = (event) => {
    this.setState({ openDrawer: false });
  }
  onOpenDrawer = (event) => {
    this.setState({ openDrawer: true });
  }
  openDrawer = (event) => {
    this.setState({ openDrawer: true })
  }

  componentDidMount() {
    const { fetchClass, fetchedClassStatus, loginStatus } = this.props;
    document.title = "Quản lý lớp học"
    if(loginStatus && !fetchedClassStatus) {
      fetchClass();
    }
  }
  componentDidUpdate() {
    const { fetchClass, fetchedClassStatus, loginStatus } = this.props;
    if(loginStatus && !fetchedClassStatus) {
      fetchClass();
    }
  }
  onChangeRoute = (route) => {
    this.props.redirect(route);
  }

  onChangeSearchValue = (value) => {
    this.setState({
      searchValue: value
    })
  }
  render() {
    const { openDrawer, searchValue } = this.state;
    const { loginStatus, ...remainProps } = this.props;
    return (
      <React.Fragment>
        <Appbar logout={this.props.logout} loginStatus={true} openDrawer={this.onOpenDrawer} />
        <Drawer loginStatus={true} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
        <Searchbox onChangeSearchValue={this.onChangeSearchValue} loginStatus={loginStatus} placeholder="Search" />
        <Class searchValue={searchValue} {...remainProps} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  loginStatus: state.auth.loginStatus,
  classList: state.classes.classes,
  fetchedClassStatus: state.classes.fetched
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  fetchClass: compose(dispatch, fetchClassSaga),
  editClass: compose(dispatch, editClassSaga),
  addClass: compose(dispatch, addClassSaga),
  logout: compose(dispatch, logoutSaga)

}))(ClassPage);

