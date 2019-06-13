import baseApi from './baseApi'

export const loginApi = (user) => {
  return baseApi().post('/login', user).then(function (response) {
    return response;
  })
    .catch(function (error) {
      return {
        ...error,
        err: true
      }
    })
}

export const signupApi = (user) => {
  return baseApi().post('/signup', {
    user
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}