import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile from './Profile';
import Account from './Account';

const SettingsPage = props => {
  return (
    <div>
      <h2>Settings</h2>
      <div className="row">
        <div className="col-12 col-md-3 mb-5">
          <nav className="nav flex-column nav-pills">
            <NavLink exact className="nav-link" to="/settings">
              <FontAwesomeIcon icon={['fas', 'user']} />
              <span>Profile</span>
            </NavLink>
            <NavLink className="nav-link" to="/settings/account">
              <FontAwesomeIcon icon={['fas', 'server']} />
              <span>Account</span>
            </NavLink>
          </nav>
        </div>
        <div className="col-12 col-md-9">
          <Route exact path="/settings" component={Profile} />
          <Route path="/settings/account" component={Account} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
