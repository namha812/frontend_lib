
import React from 'react';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';

import {
  routeType,
  ROUTE_HOME,
  ROUTE_ABOUT,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_ANONYMOUS,
  ROUTE_PEOPLE,
  ROUTE_BOOK_BORROW
} from './state/modules/routing';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Anonymous from './pages/Anonymous'

const routesMap = {
  [ROUTE_HOME]: Home,
  [ROUTE_ABOUT]: About,
  [ROUTE_LOGIN]: Login,
  [ROUTE_SIGNUP]: SignUp,
  [NOT_FOUND]: Home,
  [ROUTE_ANONYMOUS]: Anonymous,
  [ROUTE_PEOPLE]: Home,
  [ROUTE_BOOK_BORROW]: Home
}

const mapStateToProps = state => {
  return ({
    route: routeType(state)
  })
}

const Container = ({ route }) => {
  const Route = routesMap[route] ? routesMap[route] : routesMap[NOT_FOUND]
  return (
    <Route />
  )
}

const Routes = connect(mapStateToProps)(Container)
export default Routes;