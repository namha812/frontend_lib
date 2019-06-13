import { createReducer } from '../../reducers/helper'

export const FETCH_ACCOUNT = 'FETCH_ACCOUNT';
export const FETCH_ACCOUNT_SAGA = 'FETCH_ACCOUNT_SAGA';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const EDIT_ACCOUNT_SAGA = 'EDIT_ACCOUNT_SAGA';
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNT_SAGA = 'ADD_ACCOUNT_SAGA'

const defaultState = {
    accounts:[],
    fetched: false
}
const accountReducer = createReducer(defaultState, {
  [FETCH_ACCOUNT]: (state, action) => ({
    ...state,
    fetched: true,
    accounts: action.payload.accounts
  })
})

export const fetchAccount = (accounts) => ({
  type: FETCH_ACCOUNT,
  payload: {
    accounts
  }
})

export const fetchAccountSaga = () => ({
    type: FETCH_ACCOUNT_SAGA
})

export const editAccount = (account) => ({
  type: EDIT_ACCOUNT,
  payload: {
    account
  }
})

export const editAccountSaga = (account) => ({
    type: EDIT_ACCOUNT_SAGA,
    payload: {
      account
    }
})

export const addAccount = (account) => ({
  type: ADD_ACCOUNT,
  payload: {
    account
  }
})

export const addAccountSaga = (account) => ({
    type: ADD_ACCOUNT_SAGA,
    payload: {
      account
    }
})

export default accountReducer;