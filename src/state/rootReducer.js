
import { combineReducers } from 'redux'

import { reducer as location } from './modules/routing'
import studentReducer from './modules/student'
import { reducer as formReducer } from 'redux-form'
import auth from './modules/auth/index'
import classes from "./modules/class/index"
import category from "./modules/category/index"
import publishing from "./modules/publishing/index"
import book from './modules/book/index';
import borrow from './modules/borrow/index';

import test from './modules/testing/index';

export const reducers = combineReducers({
  location, 
  form: formReducer,
  auth,
  student: studentReducer,
  classes,
  category,
  publishing,
  book,
  borrow,
  test
})
