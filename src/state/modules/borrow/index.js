import { createReducer } from '../../reducers/helper'

export const FETCH_BORROW = 'FETCH_BORROW';
export const FETCH_BORROW_SAGA = 'FETCH_BORROW_SAGA';
export const BORROW_BOOK_SAGA = 'BORROW_BOOK_SAGA';

const defaultState = {
  borrows: []
}
const testReducer = createReducer(defaultState, {
  [FETCH_BORROW]: (state, action) => ({
    ...state,
    borrows: action.payload.borrows
  })
})

export const fetchBorrow = (borrows) => ({
  type: FETCH_BORROW,
  payload: {
    borrows
  }
});

export const fetchBorrowSaga = (payload) => ({
  type: FETCH_BORROW_SAGA,
  payload
})

export const borrowBookSaga = (payload) => ({
  type: BORROW_BOOK_SAGA,
  payload
})

export default testReducer;