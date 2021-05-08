import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/error.css';

const NotFoundPage = () => {
  return (
    <div className="error-body">
      <div id="main">
          	<div className="fof">
              		<h1>Error 404</h1>
              		<h5><Link to="/"> Go back to homepage </Link></h5>
          	</div>
      </div>

    </div>
  );
};

export default NotFoundPage;
