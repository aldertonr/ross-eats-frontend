/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      console.log('Getting users');

      const credentials = await Auth.currentCredentials();
      const lambda = new AWS.Lambda({
        credentials: Auth.essentialCredentials(credentials),
        region: 'eu-west-2',
      });

      lambda.invoke({ FunctionName: 'getAllUsers-staging' }, (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          try {
            const payload = JSON.parse(data.Payload);
            setUsers([payload]);
            console.log(payload);
          } catch (error) {
            console.log(error);
          }
        }
        return err;
      });
    };
    getUsers();
  }, []);

  return (
    <>
      <h1>User Management</h1>
      {users.map((user) => (
        <Card sx={{ maxWidth: 300 }} key={user.Attributes[0].Value}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {user.Attributes[0].Value}
            </Typography>
            <Typography variant="h5" component="div">
              {' '}
              {user.Username}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {' '}
              {user.Attributes[2].Value}
            </Typography>
            <Typography variant="body2">
              User Enabled:
              {' '}
              {user.Enabled ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2">
              Email Confirmed:
              {' '}
              {user.UserStatus === 'CONFIRMED' ? 'Yes' : 'No'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default UserManagement;
