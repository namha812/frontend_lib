
import { fork, all } from 'redux-saga/effects'

import { routes } from './routerSagas'
import auth from '../modules/auth/sagas'
import student from '../modules/student/sagas'
import classSaga from "../modules/class/sagas"
import category from "../modules/category/sagas"
import publish from "../modules/publisher/sagas"
import book from '../modules/book/sagas'
import borrow from '../modules/borrow/sagas'
import account from '../modules/account/sagas'
import historyInput from '../modules/historyInput/sagas'

export function * sagas () {
  yield all([
    yield fork(routes),
    yield fork(auth),
    yield fork(student),
    yield fork(classSaga),
    yield fork(category),
    yield fork(book),
    yield fork(publish),
    yield fork(borrow),
    yield fork(account),
    yield fork(historyInput)
  ])
}
