import { createReducer } from '../../reducers/helper'

export const FETCH_HISTORY = 'FETCH_HISTORY';
export const FETCH_HISTORY_SAGA = 'FETCH_HISTORY_SAGA';

const defaultState = {
    historyInput:[],
    fetched: false
}
const historyReducer = createReducer(defaultState, {
  [FETCH_HISTORY]: (state, action) => ({
    ...state,
    fetched: true,
    historyInput: action.payload.historyInput
  })
})

export const fetchHistory = (historyInput) => ({
  type: FETCH_HISTORY,
  payload: {
    historyInput
  }
})

export const fetchHistorySaga = () => ({
    type: FETCH_HISTORY_SAGA
})

export default historyReducer;