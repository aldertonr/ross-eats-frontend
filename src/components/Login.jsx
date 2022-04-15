/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Grid,
  Box,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import AuthService from '../services/auth.service';
import eventBus from '../libs/EventBus';

function Login() {
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState(null);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = (e) => {
    setErrors(null);
    let usernameOK = false;
    let passwordOK = false;

    if (username.length >= 4) {
      usernameOK = true;
    }
    if (password.length >= 1) passwordOK = true;

    if (usernameOK && passwordOK) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        const authResp = await AuthService.login(username, password);
        if (authResp.username && authResp.JWT) {
          setErrors(null);
          navigate('/profile');
          eventBus.dispatch('toast', { message: 'Logged in successfully!', level: 'success' });
          eventBus.dispatch('login');
        } else {
          setErrors(authResp);
        }
      } catch (error) {
        console.error(`Error whilst logging in: ${error.message}`);
      }
    }
  };

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item>
        <br />
        <Card sx={{ width: '20vw' }}>
          <CardMedia
            image="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              autoComplete="off"
              onChange={validateForm}
              onSubmit={handleLogin}
            >
              <Typography gutterBottom variant="h5" component="div">
                Login
              </Typography>
              <div>
                <TextField
                  id="filled-password-input"
                  label="Username"
                  autoComplete="current-username"
                  variant="filled"
                  error={errors !== null}
                  onChange={onChangeUsername}
                />
              </div>
              <br />
              <div>
                <TextField
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                  error={errors !== null}
                  onChange={onChangePassword}
                />
              </div>
              {errors && (
              <Typography gutterBottom variant="p" component="div" sx={{ color: 'red' }}>
                {errors}
              </Typography>
              )}
              <br />
              <div>
                <Button variant="contained" type="submit" disabled={!formValid}>Log In</Button>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
}

export default Login;
