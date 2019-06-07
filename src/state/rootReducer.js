
import { combineReducers } from 'redux'

import { reducer as location } from './modules/routing'
import studentReducer from './modules/student'
import { reducer as formReducer } from 'redux-form'
import auth from './modules/auth/index'
import classes from "./modules/class/index"
import category from "./modules/category/index"
import publisher from "./modules/publisher/index"
import book from './modules/book/index';
import borrow from './modules/borrow/index';
import account from './modules/account/index';
import historyInput from './modules/historyInput/index';

export const reducers = combineReducers({
  location, 
  form: formReducer,
  auth,
  student: studentReducer,
  classes,
  category,
  publisher,
  book,
  borrow,
  account,
  historyInput
})
