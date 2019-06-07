import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { compose } from 'redux';

import { renderTextField } from '../../redux-form';
import './styles.scss';
import { loginApi, signupApi } from '../../api/userApi';
import { routeSignup } from '../../state/modules/routing/actions';
import { loginSaga } from '../../state/modules/auth/index'

const selector = formValueSelector('loginForm');


class Login extends Component {

  handleSubmit = (event) => {
    console.log(event)
  }

  handleLogin = () => {
    const { user } = this.props
    this.props.loginSaga(user);
  }

  handleSignup = () => {
    const { user } = this.props
    signupApi(user)
  }

  render() {
    return (
      <div className = 'container'>
        <div className = 'bodylogin'>
          <div className = 'form-container'>
            <form onSubmit={this.handleLogin} className = 'form'>
              <span className="login-form-title">
                Login
              </span>
              <div className='field'>
                <Field
                  name='username'
                  label='Username'
                  type='text'
                  component={renderTextField}
                />
              </div>
              <div className='field'>
                <Field
                  name='password'
                  label='Password'
                  type='password'
                  component={renderTextField}
                />
              </div>
              <div className='btnBottom'>
                <input className='btnLogin'  type = "submit"  value="Đăng nhập"/>
              </div>
              <div>
                Not a member? <Link to={routeSignup()}>Signup Page</Link>
              </div>
            </form>
          </div> 
        </div>
      </div>
    )
  }
}

Login = connect(
  state => ({
    user: selector(state, 'username', 'password')
  }),
  dispath =>({
    loginSaga: compose(dispath, loginSaga)
  })
)(Login)

export default reduxForm({
  form: 'loginForm'
})(Login)