import React from 'react';
import { useDispatch } from 'react-redux';

import { clearErrors } from '../../actions/error';

const Alert = props => {
  const dispatch = useDispatch();

  return (
    <div className="alert alert-danger">
      <strong className="mr-2">Oops!</strong>
      {props.error}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => dispatch(clearErrors())}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
