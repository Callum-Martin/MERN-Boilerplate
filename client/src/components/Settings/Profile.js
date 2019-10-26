import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';

import EditableItem from '../../components/ui/EditableItem';
import { updateUser } from '../../store/actions/auth';
import UploadAvatarModal from '../../components/ui/modals/UploadAvatarModal';

const Profile = props => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Profile</h2>
      <div className="card card-body">
        <div className="content">
          <div className="left" style={{ width: 100, height: 100 }}>
            <div className="profile-container">
              {!user.avatar ? (
                <div
                  className="profile"
                  style={{ backgroundColor: user.profileColor }}
                >
                  <FaUserAlt color="#dddddd" size="80%" />
                </div>
              ) : (
                <img
                  src={`/uploads/${user.avatar}`}
                  alt="Profile"
                  className="img-thumbnail"
                />
              )}

              <UploadAvatarModal />
            </div>
          </div>
          <div className="full">
            <EditableItem
              title="Name"
              value={user.name}
              onSave={data => dispatch(updateUser(data))}
              keyName="name"
            />
            <EditableItem
              title="Email"
              value={user.email}
              onSave={data => dispatch(updateUser(data))}
              keyName="email"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
