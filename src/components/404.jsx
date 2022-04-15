import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p style={{ textAlign: 'center' }}>
        <Button LinkComponent={Link} to="/" variant="contained">Go to Home </Button>
      </p>
    </div>
  );
}

export default NotFoundPage;
