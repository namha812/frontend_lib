import baseApi from './baseApi'

export const fetchStudent = () => {
  return baseApi.get('/student').then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const addStudent = (student) => {
  return baseApi.post('/student', student).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const updateStudent = (student) => {
  const { id } = student;
  return baseApi.put(`/student/${id}`, student).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const deleteStudent = (studentId) => {
  return baseApi.delete(`/student/${studentId}`).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}