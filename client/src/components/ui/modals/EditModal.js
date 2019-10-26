import React from 'react';

import Modal from './Modal';

const EditModal = props => {
  return (
    <Modal
      submitButton={{ className: 'btn btn-outline-success' }}
      submitButtonText="Update"
      {...props}
    />
  );
};

export default EditModal;
