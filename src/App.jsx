/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import './App.css';
import { Snackbar, Alert, Slide } from '@mui/material';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Profile from './components/Profile';
import PageNotFound from './components/404';
import UnauthPage from './components/403';
import Manage from './components/auth/Manage';
import EventBus from './libs/EventBus';
import authHelper from './libs/auth_helper';

function AdminRoute({ children }) {
  const location = useLocation();
  const userIsAdmin = authHelper.userIsAdmin();
  if (!userIsAdmin) {
    return <Navigate to="/unauth" state={{ from: location }} />;
  }
  return children;
}

function App() {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackLevel, setSnackLevel] = useState('info');

  EventBus.on('toast', (data) => {
    setSnackMessage(data.message);
    setSnackLevel(data.level);
    setSnackOpen(true);
  });

  const handleClose = () => {
    setSnackOpen(false);
  };

  return (
    <div className="App">
      <Authenticator>
        {() => (
          <>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="menu" element={<Menu />} />
              <Route
                exact
                path="profile"
                element={<Profile />}
              />
              <Route
                exact
                path="manage"
                element={(
                  <AdminRoute>
                    <Manage />
                  </AdminRoute>
                )}
              />
              <Route exact path="unauth" element={<UnauthPage />} />
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
          </>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
