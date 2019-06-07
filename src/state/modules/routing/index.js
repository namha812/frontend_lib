import { 
  connectRoutes
} from 'redux-first-router';
// import createHistory from 'history/createBrowserHistory';
// import { apiMiddleware } from 'redux-api-middleware';
import { redirect } from 'redux-first-router';
// import createSagaMiddleware from 'redux-saga';
import queryString from 'query-string';
import { find } from 'lodash';
// ROUTES
export const ROUTE_HOME = 'route/ROUTE_HOME';
export const ROUTE_ABOUT = 'route/ROUTE_ABOUT';
export const ROUTE_LOGIN = 'route/ROUTE_LOGIN';
export const ROUTE_PAYLOAD = 'route/ROUTE_PAYLOAD';
export const ROUTE_SIGNUP = 'route/ROUTE_SIGNUP';
export const ROUTE_ANONYMOUS = 'route/ROUTE_ANONYMOUS';
export const ROUTE_PEOPLE ='route/ROUTE_PEOPLE';
export const ROUTE_BOOK_BORROW = 'route/ROUTE_BOOK_BORROW';
export const ROUTE_BOOK = 'route/ROUTE_BOOK';
export const ROUTE_CATEGORY = 'route/ROUTE_CATEGORY';
export const ROUTE_BORROW = 'route/ROUTE_BORROW';
export const ROUTE_PUBLISHER_HOUSE = 'route/ROUTE_PUBLISHER_HOUSE';
export const ROUTE_ACCOUNT = 'route/ROUTE_ACCOUNT';
export const ROUTE_HISTORY_INPUT = 'route/ROUTE_HISTORY_INPUT';
export const ROUTE_LOGOUT = 'route/ROUTE_LOGOUT'

// selector
export const routeType = state => state.location.type
//routes map
export const routesMap = {
  [ROUTE_HOME]: {
    path: "/",
    component: "Searchbox",
  },
  [ROUTE_LOGOUT]: {
    path: "/logout",
    component: "Home",
  }, 
  [ROUTE_ABOUT]:
  {
    path: '/about',
    component: "Home",
  },
  [ROUTE_LOGIN]: {
    path: "/login",
    component: "Auth",
    requiresAuth: false
  },
  [ROUTE_ANONYMOUS]: {
    path: "/anonymous",
    modalOver: ROUTE_ANONYMOUS,
    component: "Searchbox",
    requiresAuth: true
  },
  [ROUTE_PEOPLE]: {
    path: "/student-manage",
    component: "Home",
    requiresAuth: true,
    modalOver: ROUTE_HOME
  },
  [ROUTE_BOOK_BORROW] : {
    path:"/book-borrow",
    component: "Home", 
    requiresAuth: true,
    modalOver: ROUTE_ANONYMOUS,
  },
  [ROUTE_BOOK] : {
    path:"/book-manage",
    component: "Home", 
    requiresAuth: true,
    modalOver: ROUTE_ANONYMOUS,
  },
  [ROUTE_BORROW] : {
    path: "/borrow-manage",
    component: "BorrowManagement",
    requiresAuth: true,
    modalOver: ROUTE_ANONYMOUS,
  },
  [ROUTE_CATEGORY]: {
    path: "/category",
    component: "Category",
    requiresAuth: true,
    modalOver: ROUTE_ANONYMOUS
  },
  [ROUTE_PUBLISHER_HOUSE]: {
    path: "/publisher-house",
    component: 'PublisherHouse',
    requiresAuth: true,
    modalOver: ROUTE_ANONYMOUS
  },
  [ROUTE_ACCOUNT]: {
    path: "/account",
    component: 'Account',
    requiresAuth: true,
    modalOver: ROUTE_ANONYMOUS
  },
  [ROUTE_HISTORY_INPUT]: {
    path: "/history-input",
    component: 'HistoryInput',
    requiresAuth: true,
    modalOver: ROUTE_ANONYMOUS
  }
}

export const routeLogin = () => ({
  type: ROUTE_LOGIN
})

const {
  reducer,
  middleware,
  enhancer
} = connectRoutes(routesMap, {
  querySerializer: queryString,
  initialDispatch: false,
  onBeforeChange: (dispatch, getState, { action }) => {
    const routeDefinition = routesMap[action.type];

    if (routeDefinition && routeDefinition.redirects) {
      const matchedRedirect = find(
        routeDefinition.redirects,
        ({ test }) => !!test(getState, action)
      );

      matchedRedirect && dispatch(redirect(matchedRedirect.to));
    }
  }
})

export {
  reducer,
  middleware,
  enhancer
}


