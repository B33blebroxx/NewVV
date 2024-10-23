/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser, updateUser } from '../../utils/auth';

export default function AdminDialog({
  existingUser = null, onCloseDialog = null, open, onSaveUser = null,
}) {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (existingUser) {
      setUserData({
        username: existingUser.username || '',
        email: existingUser.email || '',
        password: '',
      });
    } else {
      setUserData({ username: '', email: '', password: '' });
    }
  }, [existingUser]);

  const handleClose = () => {
    setUserData({ username: '', email: '', password: '' });
    setError('');
    if (onCloseDialog) onCloseDialog();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSaveUser = async () => {
    const { username, email, password } = userData;
    if (!username || !email) {
      setError('Username and email are required');
      return;
    }

    try {
      const userPayload = { Username: username, Email: email };

      if (existingUser) {
        // For editing, include password only if it's provided
        if (password) {
          userPayload.Password = password;
        }
        await updateUser(existingUser.id, userPayload);
      } else {
        // For adding new user, password is required
        if (!password) {
          setError('Password is required for new admin users');
          return;
        }
        userPayload.Password = password;
        await registerUser(userPayload);
      }

      if (onSaveUser) {
        await onSaveUser();
      }
      handleClose();
    } catch (err) {
      setError(err.response?.data || 'An error occurred while saving the user.');
      console.error('Error saving user:', err.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{existingUser ? 'Edit Admin User' : 'Add New Admin User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          value={userData.username}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
          fullWidth
          value={userData.password}
          onChange={handleInputChange}
          helperText={existingUser ? 'Leave blank to keep existing password' : ''}
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
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveUser} color="primary">
          {existingUser ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AdminDialog.propTypes = {
  existingUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
  onCloseDialog: PropTypes.func,
  onSaveUser: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
