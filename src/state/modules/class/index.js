import { createReducer } from '../../reducers/helper'

export const FETCH_CLASS = 'FETCH_CLASS';
export const FETCH_CLASS_SAGA = 'FETCH_CLASS_SAGA';
export const EDIT_CLASS = 'EDIT_CLASS';
export const EDIT_CLASS_SAGA = 'EDIT_CLASS_SAGA';
export const ADD_CLASS = 'ADD_CLASS';
export const ADD_CLASS_SAGA = 'ADD_CLASS_SAGA';

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

  export const editClass = (classes) => ({
    type: EDIT_CLASS,
    payload: {
      classes
    }
  })
  
  export const editClassSaga = (classes) => ({
      type: EDIT_CLASS_SAGA,
      payload: {
        classes
      }
  })
  
  export const addClass = (classes) => ({
    type: ADD_CLASS,
    payload: {
      classes
    }
  })
  
  export const addClassSaga = (classes) => ({
      type: ADD_CLASS_SAGA,
      payload: {
        classes
      }
  })
export default testReducer;