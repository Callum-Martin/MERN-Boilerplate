import React, { Fragment, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Input from '../ui/Input'

import { register } from '../../actions/auth'
import Alert from '../ui/Alert'

const validateInput = ({ email, name, password, confirmPassword }) => {
  var error = null

  if (!email || !name || !password || !confirmPassword) {
    error = 'All fields are required'
  } else if (password !== confirmPassword) {
    error = 'Passwords do not match'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error = 'Enter a valid email address'
  } else if (password.length < 6) {
    error = 'Password must be at least 6 characters'
  }

  return {
    error,
    isValid: error === null
  }
}

const Signup = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch()

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const error = useSelector(state => state.error)

  const signUpHandler = e => {
    e.preventDefault()

    const { error, isValid } = validateInput({
      name,
      email,
      password,
      confirmPassword
    })
    if (!isValid) {
      setErrorMessage(error)
      return
    }

    const newUser = {
      name,
      email,
      password
    }

    dispatch(register(newUser))
  }

  useEffect(
    () => {
      if (error.id === 'REGISTER_FAIL') {
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
              <form onSubmit={signUpHandler}>
                <div className="row mt-5">
                  <div className="col-12">
                    <Input label="Name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                    <Input
                      label="Email"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      label="Password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <div className="col-4 offset-5">
                    <button className="btn btn-primary" type="submit">
                      Sign Up
                    </button>
                  </div>
                  <div className="col-6 offset-3 p-3">
                    <p>
                      Already have an account? Click <Link to="/login">here</Link> to login.
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

export default Signup
