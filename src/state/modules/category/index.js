import { createReducer } from '../../reducers/helper'

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_SAGA = 'FETCH_CATEGORY_SAGA';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const EDIT_CATEGORY_SAGA = 'EDIT_CATEGORY_SAGA';
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORY_SAGA = 'ADD_CATEGORY_SAGA'

const defaultState = {
    categories:[]
}
const categoryReducer = createReducer(defaultState, {
  [FETCH_CATEGORY]: (state, action) => ({
    ...state,
    categories: action.payload.categories
  })
})

export const fetchCategory = (categories) => ({
  type: FETCH_CATEGORY,
  payload: {
    categories
  }
})

export const fetchCategorySaga = () => ({
    type: FETCH_CATEGORY_SAGA
})

export const editCategory = (category) => ({
  type: EDIT_CATEGORY,
  payload: {
    category
  }
})

export const editCategorySaga = (category) => ({
    type: EDIT_CATEGORY_SAGA,
    payload: {
      category
    }
})

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: {
    category
  }
})

export const addCategorySaga = (category) => ({
    type: ADD_CATEGORY_SAGA,
    payload: {
      category
    }
})

export default categoryReducer;