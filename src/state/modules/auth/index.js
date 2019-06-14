import { createReducer } from '../../reducers/helper'

export const LOGIN_SAGA = 'login saga';
export const SIGNUP_SAGA = 'signup saga';
export const LOADING_LOGIN = 'loading login';
export const LOADED_LOGIN = 'loaded login';
export const LOGIN_ERROR = 'login error';
export const LOADING_SIGNUP = 'loading signup';
export const LOADED_SIGNUP = 'loaded signup';
export const SIGNUP_ERROR = 'signup error';
export const CHECK_LOGIN = 'check login';
export const LOGOUT = 'log out';
export const LOGOUT_SAGA = 'log out saga'
export const SHOW_DETAILS = 'SHOW_DETAILS';
export const HIDE_DETAILS = 'HIDE_DETAILS';
export const UPDATE_USER = 'UPDATE_USER'

const defaultState = {
  loading: false,
  loaded: false,
  loginStatus: false,
  user: {},
  OAuthToken: null,
  OAuthErrorCode: null,
  OAuthErrorDescription: null,
  sessionToken: null,
  showDetails: false
}
const authReducer = createReducer(defaultState, {
  [LOADING_LOGIN]: (state, action) => ({
    ...state,
    loading: true
  }),
  [LOADED_LOGIN]: (state, action) => {
    return ({
      ...state,
      loading: false,
      loaded: true,
      loginStatus: true,
      OAuthToken: action.payload.token,
      sessionToken: action.payload.sessionToken,
      user: action.payload.user
    })
  },
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    OAuthErrorCode: action.payload.OAuthErrorCode,
    OAuthErrorDescription: action.payload.OAuthErrorDescription
  }),
  [LOGOUT]: (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    loginStatus: false,
    user: {},
    OAuthToken: null,
    OAuthErrorCode: null,
    OAuthErrorDescription: null,
    sessionToken: null
  }),
  [SHOW_DETAILS]: (state, action) => ({
    ...state,
    showDetails: true
  }),
  [HIDE_DETAILS]: (state, action) => ({
    ...state,
    showDetails: false
  }),
  [UPDATE_USER]: (state, action) => {
    const {fullName} = action.payload.user;
    return ({
      ...state,
      user: {
        ...state.user,
        fullName: fullName
      }
    })
  }
})

export const loginSaga = (payload) => ({
  type: LOGIN_SAGA,
  payload
})

export const loadingLogin = () => ({
  type: LOADING_LOGIN
})

export const loadedLogin = (payload) => ({
  type: LOADED_LOGIN,
  payload
})

export const errorLogin = (payload) => ({
  type: LOGIN_ERROR,
  payload
})

export const checkLogin = () => ({
  type: CHECK_LOGIN
})

export const logout = () => ({
  type: LOGOUT
})

export const logoutSaga = () => ({
  type: LOGOUT_SAGA
})

export const getToken = (state) => state.auth.OAuthToken;

 export const showDetails = () => ({
  type: SHOW_DETAILS
 })
 export const hideDetails = () => ({
  type: HIDE_DETAILS
 })

 export const updateInfoUser = (user) => ({
   type: UPDATE_USER,
   payload: {
     user
   }
 })

export default authReducer;