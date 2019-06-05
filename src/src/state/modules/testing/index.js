import { createReducer } from '../../reducers/helper'

export const TESTING = 'something';
export const TESTING_SAGA = 'somthing saga';

const defaultState = {
  mookdata:{
      "something": "something"
  }
}
const testReducer = createReducer(defaultState, {
  [TESTING]: (state, action) => ({
    ...state,
    loading: true,
    data: action.payload
  })
})

export const test = (payload) => ({
  type: TESTING,
  payload
});

export const testSaga = (payload) => ({
  type: TESTING_SAGA,
  payload
})

export default testReducer;