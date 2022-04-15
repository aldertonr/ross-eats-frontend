import { Auth } from 'aws-amplify';

const userIsAdmin = () => {
  try {
    const userGroups = Auth.user.signInUserSession.idToken.payload['cognito:groups'];
    if (userGroups.includes('admin')) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  userIsAdmin,
};
