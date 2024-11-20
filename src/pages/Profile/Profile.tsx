import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';

const Profile: React.FC = () => {
  const { user, fetchProfile } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Nome: {user.usuario}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
