import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function UnauthPage() {
  return (
    <div>
      <h1>403</h1>
      <h2>Unauthorised</h2>
      <p style={{ textAlign: 'center' }}>
        <Button LinkComponent={Link} to="/" variant="contained">Go to Home </Button>
      </p>
    </div>
  );
}

export default UnauthPage;
