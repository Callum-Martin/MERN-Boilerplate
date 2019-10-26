import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/auth';

const Nav = props => {
  const [isOpen, setIsOpen] = useState(false)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const toggle = () => {
    setIsOpen(open => !open)
  }

  const dispatch = useDispatch();

  const authLinks = (
    <div className="navbar-nav ml-auto">
      <Link className="nav-item nav-link" to="/dashboard">
        Dashboard
      </Link>
      <Link className="nav-item nav-link" to="/login"
      onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </div>
  )

  const guestLinks = (
    <div className="navbar-nav ml-auto">
      <Link to="login">
        <button className="btn btn-info my-2 my-sm-0" type="submit">
          Login
        </button>
      </Link>
    </div>
  )

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            [ Company Logo ]
          </Link>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
