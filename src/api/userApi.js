import baseApi from './baseApi'

export const loginApi = (user) => {
    return baseApi.post('/login', user);
}

export const signupApi = (user) => {
    return baseApi.post('/signup', {
       user
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}