import React from 'react';
import AuthService from '../services/auth.service';

function Profile() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.user}</strong>
          {'\'s '}
          Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {' '}
        {currentUser.token.substring(0, 20)}
        {' '}
        ...
        {' '}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>Username:</strong>
        {' '}
        {currentUser.user}
      </p>
      <p>
        <strong>Email:</strong>
        {' '}
        {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles
          // eslint-disable-next-line react/no-array-index-key
          && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
}

export default Profile;
