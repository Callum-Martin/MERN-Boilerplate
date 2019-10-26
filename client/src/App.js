import React, { useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
import * as io from 'socket.io-client';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { loadUser } from './actions/auth';

import Layout from './layout/Layout';
import ScrollToTop from './components/Scroll/ScrollToTop.js';

import './assets/css/bootstrap.css';
import PropTypes from 'prop-types';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop>
        <div>
          <Layout />
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
