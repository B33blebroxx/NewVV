import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,
} from '@mui/material';
import { signIn } from '../../utils/auth';

const SignInDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await signIn(email, password);
      onClose();
      window.location.reload();
    } catch (error) {
      setErrorMessage('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          style={{ marginTop: '16px' }}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Sign In</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInDialog;

SignInDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

SignInDialog.defaultProps = {
  open: false,
  onClose: () => {},
};
