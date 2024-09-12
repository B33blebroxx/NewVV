import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { signIn } from '../../utils/auth';

const SignInDialog = ({ open, onClose, onSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSignIn = async () => {
    try {
      await signIn(credentials.username, credentials.password);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error during sign-in:', err.message);
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={credentials.username}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSignIn} variant="contained" color="primary">
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SignInDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

SignInDialog.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: null,
};

export default SignInDialog;
