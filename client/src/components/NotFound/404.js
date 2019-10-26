import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center p-5">404 Not Found</div>
          </div>
        </div>
      </div>
    )
  }
}
