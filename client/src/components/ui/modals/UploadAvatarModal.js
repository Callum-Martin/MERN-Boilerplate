import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import EditModal from './EditModal';
import { uploadAvatar } from '../../../store/actions/auth';

const UploadAvatarModal = props => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState('Choose File');
  const dispatch = useDispatch();

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const uploadAvatarHandler = e => {
    e.preventDefault();
    if (!file) {
      return false;
    }
    dispatch(uploadAvatar(file));
    return true;
  };

  return (
    <EditModal
      openButton={{ className: 'btn btn-primary add-photo-btn' }}
      openButtonText={<FaPlus />}
      modalTitle="Upload Profile Picture"
      submitButtonText="Upload"
      onSubmit={uploadAvatarHandler}
    >
      <div className="input-group">
        <div className="custom-file">
          <input
            type="file"
            name="file"
            className="custom-file-input"
            id="file"
            accept="image/*"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="file">
            {filename}
          </label>
        </div>
      </div>
    </EditModal>
  );
};

export default UploadAvatarModal;
