import React, { Component } from 'react';
import './App.scss';
import Routes from '../../rootRouter'
import { connect } from "react-redux";
import { compose } from "redux";
import ToastNotification from '../../containers/ToastNotification';
import {
  checkLogin
} from '../../state/modules/auth'


class App extends Component {
  componentDidMount() {
    const {checkLogin} = this.props;
    checkLogin();
  }
  
  render() {
    return (
      <div className="App">
        <Routes />
        <ToastNotification />
      </div>
    );
  }
}
export default connect(state => ({
  loginStatus: state.auth.loginStatus,
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  checkLogin: compose(dispatch, checkLogin),

}))(App);

