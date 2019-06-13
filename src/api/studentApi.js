import baseApi from './baseApi'

export const fetchStudent = (token) => {
  return baseApi(token).get('/student').then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const addStudent = (student,token) => {
  return baseApi(token).post('/student', student).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const updateStudent = (student,token) => {
  const { id } = student;
  return baseApi(token).put(`/student/${id}`, student).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const deleteStudent = (studentId,token) => {
  return baseApi(token).delete(`/student/${studentId}`).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}