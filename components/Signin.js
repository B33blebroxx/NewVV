import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import SignInDialog from './dialogs/SignInDialog';

function Signin({ onSuccess }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSignInSuccess = () => {
    handleCloseDialog();
    if (onSuccess) onSuccess();
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1>Hi there!</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={handleOpenDialog}>
        Sign In
      </Button>
      <SignInDialog open={dialogOpen} onClose={handleCloseDialog} onSuccess={handleSignInSuccess} />
    </div>
  );
}

Signin.propTypes = {
  onSuccess: PropTypes.func,
};

Signin.defaultProps = {
  onSuccess: () => {},
};

export default Signin;
