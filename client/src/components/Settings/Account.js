import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteUser } from '../../store/actions/auth';

import ConfirmDeleteModal from '../../components/ui/modals/ConfirmDeleteModal';

const AccountPage = props => {
  const dispatch = useDispatch();

  const deleteUserHandler = () => {
    dispatch(deleteUser());
  };

  return (
    <div>
      <h2>Account</h2>
      <ConfirmDeleteModal
        openButtonText="Delete Account"
        onSubmit={deleteUserHandler}
        modalTitle="Delete Account"
      >
        <strong>Are you sure you want to delete your account?</strong>
      </ConfirmDeleteModal>
    </div>
  );
};

export default AccountPage;
