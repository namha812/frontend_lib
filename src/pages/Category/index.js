import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Searchbox from '../../components/Searchbox';
import Category from '../../components/Category';
import * as routeTypes from '../../state/modules/routing';
import {
  fetchCategorySaga,
  editCategorySaga,
  addCategorySaga
} from '../../state/modules/category'

class CategoryPage extends Component {
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
    const { fetchCategory } = this.props;
    fetchCategory();
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
        <Appbar loginStatus={true} openDrawer={this.onOpenDrawer} />
        <Drawer loginStatus={true} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
        <Searchbox onChangeSearchValue={this.onChangeSearchValue} loginStatus={loginStatus} placeholder="Search" />
        <Category searchValue={searchValue} {...remainProps} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  loginStatus: state.auth.loginStatus,
  categories: state.category.categories
}), (dispatch) => ({ //connect and dispatch your action to call into your reducer - remember your payload.
  redirect: (route) => dispatch({
    type: route
  }),
  fetchCategory: compose(dispatch, fetchCategorySaga),
  editCategory: compose(dispatch, editCategorySaga),
  addCategory: compose(dispatch, addCategorySaga),
}))(CategoryPage);

