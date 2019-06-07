import { createReducer } from '../../reducers/helper'

export const FETCH_PUBLISHER = 'FETCH_PUBLISHER';
export const FETCH_PUBLISHER_SAGA = 'FETCH_PUBLISHER_SAGA';
export const ADD_PUBLISHER = 'ADD_PUBLISHER'
export const ADD_PUBLISHER_SAGA = 'ADD_PUBLISHER_SAGA'
export const EDIT_PUBLISHER = 'EDIT_PUBLISHER'
export const EDIT_PUBLISHER_SAGA = 'EDIT_PUBLISHER_SAGA'

const defaultState = {
  publisherHouse: []
}
const publisherReducer = createReducer(defaultState, {
  [FETCH_PUBLISHER]: (state, action) => ({
    ...state,
    publisherHouses: action.payload.publisherHouse
  })
})

export const fetchPublisher = (publisherHouse) => ({
  type: FETCH_PUBLISHER,
  payload: {
    publisherHouse
  }
})

export const fetchPublisherSaga = () => ({
  type: FETCH_PUBLISHER_SAGA
})

export const addPublisher = (publisher) => ({
  type: ADD_PUBLISHER,
  payload: {
    publisher
  }
})

export const addPublisherSaga = (publisher) => ({
  type: ADD_PUBLISHER_SAGA,
  payload: {
    publisher
  }
})

export const editPublisher = (publisher) => ({
  type: EDIT_PUBLISHER,
  payload: {
    publisher
  }
})

export const editPublisherSaga = (publisher) => ({
  type: EDIT_PUBLISHER_SAGA,
  payload: {
    publisher
  }
})

export default publisherReducer;