import { createReducer } from '../../reducers/helper'

export const LOGIN_SAGA = 'login saga';
export const SIGNUP_SAGA = 'signup saga';

export const LOADING_LOGIN = 'loading login';
export const LOADED_LOGIN = 'loaded login';
export const LOGIN_ERROR = 'login error';

export const LOADING_SIGNUP = 'loading signup';
export const LOADED_SIGNUP = 'loaded signup';
export const SIGNUP_ERROR = 'signup error';


const defaultState = {
  loading: false,
  loaded: false,
  OAuthToken: null,
  OAuthErrorCode: null,
  OAuthErrorDescription: null,
  sessionToken: null
}
const authReducer = createReducer(defaultState, {
  [LOADING_LOGIN]: (state, action) => ({
    ...state,
    loading: true
  }),
  [LOADED_LOGIN]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    OAuthToken: action.payload.OAuthToken,
    sessionToken: action.payload.sessionToken
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    OAuthErrorCode: action.payload.OAuthErrorCode,
    OAuthErrorDescription: action.payload.OAuthErrorDescription
  })
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


export default authReducer;