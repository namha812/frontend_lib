import { createReducer } from '../../reducers/helper'

export const FETCH_PUBLISHING = 'FETCH_PUBLISHING';
export const FETCH_PUBLISHING_SAGA = 'FETCH_PUBLISHING_SAGA';

const defaultState = {
  publisingCompany:[]
}
const testReducer = createReducer(defaultState, {
  [FETCH_PUBLISHING]: (state, action) => ({
    ...state,
    publisingCompany: action.payload.publisingCompany
  })
})

export const fetchPublishing = (publisingCompany) => ({
  type: FETCH_PUBLISHING,
  payload: {
    publisingCompany
  }
})

export const fetchPublishingSaga = () => ({
    type: FETCH_PUBLISHING_SAGA
  })

export default testReducer;