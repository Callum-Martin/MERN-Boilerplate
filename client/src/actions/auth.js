import axios from 'axios';

import { returnErrors } from './error';

export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const UPDATE_USER = 'UPDATE_USER';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const register = ({ name, email, password }) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch({ type: REGISTER_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
    });
};

export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};

export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch({ type: LOGIN_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
    });
};

export const deleteUser = () => (dispatch, getState) => {
  axios
    .delete('/api/users', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateUser = userData => (dispatch, getState) => {
  axios
    .put('/api/users', JSON.stringify(userData), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_USER,
        payload: {
          ...userData,
        },
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const uploadAvatar = file => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post(
      '/api/users/profile-image',
      formData,
      tokenConfig(getState, 'multipart/form-data')
    );
    dispatch({
      type: UPDATE_USER,
      payload: {
        avatar: res.data.fileName,
      },
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Helpers
export const tokenConfig = (getState, contentType = 'application/json') => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': contentType,
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
