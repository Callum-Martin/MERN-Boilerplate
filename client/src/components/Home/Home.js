import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Home extends React.Component {
  render() {
    return (
      <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center p-5"><h3>Homepage</h3></div>
            </div>
          </div>
      </div>
    );
  }
}
