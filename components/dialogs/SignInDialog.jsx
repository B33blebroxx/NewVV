/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DOMPurify from 'dompurify';
import { signIn } from '../../utils/auth';

function SignInDialog({ open = false, onClose = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault(); // Prevent default form submission behavior
    }
    try {
      const sanitizedEmail = DOMPurify.sanitize(email);
      await signIn(sanitizedEmail, password);
      onClose();
      window.location.reload();
    } catch (error) {
      setErrorMessage('Failed to sign in. Please check your email and password.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In</DialogTitle>
      <form onSubmit={handleSubmit}>
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{ marginTop: '16px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Sign In</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SignInDialog;

SignInDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
