import React from 'react';
import { Auth } from 'aws-amplify';

function Profile() {
  const { user } = Auth;
  return (
    <div className="container">
      <header className="jumbotron">
        <h2>
          Profile
        </h2>
      </header>
      <p>
        <strong>Username: </strong>
        {user.username}
      </p>
      <p>
        <strong>Email Verified: </strong>
        {user.attributes.email_verified ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>User Groups: </strong>
        {user.signInUserSession.idToken.payload['cognito:groups'].join(', ')}
      </p>
      <p>
        <strong>Login Time: </strong>
        {new Date(user.signInUserSession.idToken.payload.iat * 1000).toLocaleString()}
      </p>
      <p>
        <strong>Token Expiry Time: </strong>
        {new Date(user.signInUserSession.idToken.payload.exp * 1000).toLocaleString()}
      </p>
    </div>
  );
}

export default Profile;
