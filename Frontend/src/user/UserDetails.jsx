import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/user/login'); // Redirect if no user
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Profile</h3>
      <p><strong>Full Name:</strong> {user?.fullName}</p>
      <p><strong>Address:</strong> {user?.address}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Phone Number:</strong> {user?.phoneNumber}</p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserDetails;






