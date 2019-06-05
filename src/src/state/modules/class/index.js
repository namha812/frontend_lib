import { createReducer } from '../../reducers/helper'

export const FETCH_CLASS = 'FETCH_CLASS';
export const FETCH_CLASS_SAGA = 'FETCH_CLASS_SAGA';

const defaultState = {
  classes:[]
}
const testReducer = createReducer(defaultState, {
  [FETCH_CLASS]: (state, action) => ({
    ...state,
    classes: action.payload.classes
  })
})

export const fetchClass = (classes) => ({
  type: FETCH_CLASS,
  payload: {
    classes
  }
})

export const fetchClassSaga = () => ({
    type: FETCH_CLASS_SAGA
  })

export default testReducer;