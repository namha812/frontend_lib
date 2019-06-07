
import React, { Component } from 'react';
import Routes from '../../rootRouter'
import { connect } from "react-redux";
import { compose } from "redux";
import {
  checkLogin
} from '../../state/modules/auth'
import Login from '../../components/Login';

class App extends Component {
  componentDidMount() {
    const {checkLogin} = this.props;
    checkLogin();
  }
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}
export default connect(state => ({
  loginStatus: state.auth.loginStatus,
  location: state.location,
  route: state.location.type,
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  checkLogin: compose(dispatch, checkLogin)
}))(App);

