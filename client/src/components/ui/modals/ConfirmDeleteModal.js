import React from 'react';

import Modal from './Modal';

const ConfirmDeleteModal = props => {
  return (
    <Modal
      openButton={{ className: 'btn btn-outline-danger' }}
      submitButton={{ className: 'btn btn-outline-danger' }}
      submitButtonText="Delete"
      {...props}
    />
  );
};

export default ConfirmDeleteModal;
