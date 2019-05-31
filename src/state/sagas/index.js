
import { fork, all } from 'redux-saga/effects'

import { routes } from './routerSagas'
import auth from '../modules/auth/sagas'
import student from '../modules/student/sagas'

export function * sagas () {
  yield all([
    yield fork(routes),
    yield fork(auth),
    yield fork(student)
  ])
}
