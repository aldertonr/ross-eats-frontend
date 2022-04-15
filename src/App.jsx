/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Snackbar, Alert, Slide } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PageNotFound from './components/404';
// import AuthService from './services/auth.service';
import EventBus from './libs/EventBus';
import useAuth from './libs/UseAuth';

function RequireAuth({ children }) {
  const { authed } = useAuth();

  return authed === true ? children : <Navigate to="/login" replace />;
}

function App() {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackLevel, setSnackLevel] = useState('info');

  EventBus.on('toast', (data) => {
    setSnackMessage(data.message);
    setSnackLevel(data.level);
    setSnackOpen(true);
  });

  EventBus.on('login', () => {
    setIsLoggedIn(true);
  });

  EventBus.on('logout', () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  });

  const handleClose = () => {
    setSnackOpen(false);
  };

  return (
    <div className="App">
      <Navbar userIsLoggedIn={loggedIn} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="menu" element={<Menu />} />
        <Route exact path="login" element={<Login />} />
        <Route
          exact
          path="register"
          element={(
            <RequireAuth>
              <Register />
            </RequireAuth>
      )}
        />
        <Route
          exact
          path="profile"
          element={
            <RequireAuth><Profile /></RequireAuth>
}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackLevel}
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
