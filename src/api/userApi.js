import baseApi from './baseApi'

export const loginApi = (user) => {
    const { username, password } = user;
    return baseApi.post('/login', {
        username,
        password
      });
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