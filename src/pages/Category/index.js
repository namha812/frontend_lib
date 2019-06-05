import React, { Component } from 'react';
import Appbar from '../../components/AppBar'
import Drawer from '../../components/Drawer'
import Dashboard from '../../components/Dashboard'
import { connect } from "react-redux";
import { compose } from 'redux';

import { fetchCategorySaga, fetchDataTestSaga } from '../../state/modules/category'

class Home extends Component {

  state = {
    openDrawer: false,
    type: null
  }

  componentDidMount() {
    this.props.fetchCategory();
  }

  onCloseDrawer = () => {
    console.log('close')
    this.setState({ openDrawer: false });
  }

  onChangeRoute = (route) => {
    this.props.redirect(route)
  }
  onOpenDrawer = () => {
    console.log('open')
    this.setState({ openDrawer: true })
  }
  onClickTest = () => {
    this.props.fetchDataTest();
  }
  render() {
    const { openDrawer } = this.state;
    const {dataTest} = this.props
    return (
      <React.Fragment>
        <Appbar openDrawer={this.onOpenDrawer} loginStatus={true} />
        <Drawer openDrawer={openDrawer} onClose={this.onCloseDrawer} loginStatus={true} onChangeRoute={this.onChangeRoute} />
        <Dashboard type={this.state.type} />
        <div>{dataTest.name}</div>
        <button onClick={this.onClickTest}>test</button>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  loginStatus: state.auth.loginStatus,
  location: state.location,
  route: state.location.type,
  categories: state.category.categories,
  dataTest: state.category.dataTest
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  fetchCategory: compose(dispatch, fetchCategorySaga),
  fetchDataTest: compose(dispatch, fetchDataTestSaga)
}))(Home);
