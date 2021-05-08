import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <div>
      <h4>
        User logged out successfully
      </h4>
      <Link to="/covid-19"> Go back to homepage </Link>
    </div>
  );
};

export default Logout;
