
import { combineReducers } from 'redux'

import { reducer as location } from './modules/routing'
import studentReducer from './modules/student'
import { reducer as formReducer } from 'redux-form'
import auth from './modules/auth/index'

export const reducers = combineReducers({
  location, 
  form: formReducer,
  auth,
  student: studentReducer
})
