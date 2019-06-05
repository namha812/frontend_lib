
import { 
  select, 
  spawn, 
  take
} from 'redux-saga/effects'

import { 
  ROUTE_HOME, 
  routeType 
} from '../modules/routing'

// Route Sagas
import { loadHome } from './homeSagas'

const routesMap = {
  [ROUTE_HOME]: loadHome
}

export function * routes () {
  const initialRoute = yield select(routeType)
  if (routesMap[initialRoute]) {
    yield spawn(routesMap[initialRoute])
  }
  while (true) {
    const {type} = yield take(Object.keys(routesMap))
    yield spawn(routesMap[type])
  }
}
