import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dashboard = props => {
  const user = useSelector(state => state.auth.user)
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center p-5">
            <h3>Dashboard</h3>
            <p>Congratulations <u className="underline-info">{user.name}</u>, you're successfully logged in!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
