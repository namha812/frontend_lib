import baseApi from './baseApi'

export const fetchStudent = () => {
  return baseApi.get('/student');
}

export const addStudent = (student) => {
  return baseApi.post('/student', student);
}

export const updateStudent = (student) => {
  const { id } = student;
  return baseApi.put(`/student/${id}`, student);
}

export const deleteStudent = (studentId) => {
  return baseApi.delete(`/student/${studentId}`);
}