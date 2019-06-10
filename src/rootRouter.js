
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
  ROUTE_BOOK_BORROW,
  ROUTE_BOOK,
  ROUTE_BORROW,
  ROUTE_CATEGORY,
  ROUTE_PUBLISHER_HOUSE,
  ROUTE_ACCOUNT,
  ROUTE_HISTORY_INPUT,
  ROUTE_LOGOUT,
  ROUTE_CLASS
} from './state/modules/routing';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Anonymous from './pages/Anonymous';
import PeopleManager from './pages/PeopleManagement';
import BookBorrow from './pages/BookBorrow';
import BookManager from './pages/BookManagement';
import Category from './pages/Category';
import BorrowManagement from './pages/BorrowManagement';
import PublisherHouse from './pages/PublisherHouse';
import Account from './pages/Account';
import HistoryInput from './pages/HistoryInput';
import Class from './pages/Class';


const routesMap = {
  [ROUTE_HOME]: Home,
  [ROUTE_ABOUT]: About,
  [ROUTE_LOGIN]: Login,
  [ROUTE_SIGNUP]: SignUp,
  [NOT_FOUND]: Home,
  [ROUTE_LOGOUT]: Home,
  [ROUTE_ANONYMOUS]: Anonymous,
  [ROUTE_PEOPLE]: PeopleManager,
  [ROUTE_BOOK_BORROW]: BookBorrow,
  [ROUTE_BOOK]: BookManager,
  [ROUTE_BORROW]: BorrowManagement,
  [ROUTE_CATEGORY]: Category,
  [ROUTE_PUBLISHER_HOUSE]: PublisherHouse,
  [ROUTE_ACCOUNT]: Account,
  [ROUTE_HISTORY_INPUT]: HistoryInput,
  [ROUTE_CLASS]: Class
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