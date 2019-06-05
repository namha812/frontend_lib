import { createReducer } from '../../reducers/helper'

export const FETCH_STUDENT = 'fetch student';
export const FETCHING_STUDENT = 'fetching student';
export const FETCHED_STUDENT = 'fetched student';
export const FETCH_STUDENT_SAGA = 'fetch student saga';
export const ADD_STUDENT = 'add student';
export const ADD_STUDENT_SAGA = 'add student saga';
export const EDIT_STUDENT = 'EDIT student';
export const EDIT_STUDENT_SAGA = 'EDIT student saga';
export const DELETE_STUDENT = 'DELETE student';
export const DELETE_STUDENT_SAGA = 'DELETE student saga';
export const FETCHED_STUDENT_ERROR = 'fetch student error';

const defaultState = {
  fetched: false,
  fetching: false,
  error: null,
  students: []
}
const studentReducer = createReducer(defaultState, {
  [FETCHING_STUDENT]: (state, action) => ({
    ...state,
    fetching: true,
    fetched: false
  }),
  [FETCHED_STUDENT]: (state, action) => ({
    ...state,
    fetching: false,
    fetched: true
  }),
  [FETCH_STUDENT]: (state, action) => {
    console.log(action);
    return  {
      ...state,
      students: action.payload.students
    }
  },
  [FETCHED_STUDENT_ERROR]: (state, action) => ({
    ...state,
    fetching: false,
    fetched: true,
    student: [],
    error: action.payload.message
  }),
})

export const fetchStudent = (students) => ({
  type: FETCH_STUDENT,
  payload: {
    students
  }
})
export const fetchStudentSaga = (payload) => ({
  type: FETCH_STUDENT_SAGA,
})

export const fetchingStudent = () => ({
  type: FETCHING_STUDENT
})
export const fetchedStudent = () => ({
  type: FETCHED_STUDENT
})
export const addStudent = (student) => ({
  type: ADD_STUDENT,
  payload: {
    student
  }
})
export const addStudentSaga = (student) => ({
  type: ADD_STUDENT_SAGA,
  payload: {
    student
  }
})
export const editStudent = (student) => ({
  type: EDIT_STUDENT,
  payload: {
    student
  }
})
export const editStudentSaga = (student) => ({
  type: EDIT_STUDENT_SAGA,
  payload: {
    student
  }
})
export const deleteStudent = (student) => ({
  type: DELETE_STUDENT,
  payload: {
    student
  }
})
export const deleteStudentSaga = (studentId) => ({
  type: DELETE_STUDENT_SAGA,
  payload:{
    studentId
  }
})
export const fetchStudentError = (message) => ({
  type: FETCHED_STUDENT_ERROR,
  payload:{
    message
  }
})

export const getStudent = (state) => state.students;

export default studentReducer;