import { createReducer } from '../../reducers/helper'

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_SAGA = 'FETCH_CATEGORY_SAGA';

const defaultState = {
    categories:[]
}
const testReducer = createReducer(defaultState, {
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

export default testReducer;