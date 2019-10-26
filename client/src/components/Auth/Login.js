import React, { Fragment, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Input from '../ui/Input'
import Alert from '../ui/Alert'

import { login } from '../../actions/auth'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch()
  const error = useSelector(state => state.error)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const loginHandler = e => {
    e.preventDefault()

    dispatch(login({ email, password }))
  }

  useEffect(
    () => {
      if (error.id === 'LOGIN_FAIL') {
        setErrorMessage(error.message.message)
      } else {
        setErrorMessage(null)
      }
    },
    [setErrorMessage, error]
  )

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-8 offset-2 mt-5">
              {errorMessage ? <Alert error={errorMessage} /> : null}
              <form onSubmit={loginHandler}>
                <div className="row mt-5">
                  <div className="col-12">
                    <Input
                      label="Email"
                      type="text"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-4 offset-5">
                    <button className="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                  <div className="col-6 offset-3 p-3">
                    <p>
                      Don't have an account? Click <Link to="/signup">here</Link> to sign up.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
