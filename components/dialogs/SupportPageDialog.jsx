import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
} from '@mui/material';
import { getSupportPageData, editSupportPageData } from '../../api/supportPageApi'; // Assuming you have these API functions
import { useAuth } from '../../utils/context/authContext'; // Assuming you have an Auth context for user info

const EditSupportPageDialog = ({ open, onClose, onSave }) => {
  const [supportPageHeader, setSupportPageHeader] = useState('');
  const [supportPageIntro, setSupportPageIntro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Fetching the current user from the Auth context

  // Function to fetch support page info
  const fetchSupportPageInfo = async () => {
    try {
      const supportPageInfo = await getSupportPageData();
      setSupportPageHeader(supportPageInfo.supportPageHeader || '');
      setSupportPageIntro(supportPageInfo.supportPageIntro || '');
      setError(null); // Reset error on successful fetch
    } catch (err) {
      console.error('Failed to fetch support page info:', err);
      setError('Failed to load support page info');
    }
  };

  // Fetch support page info when the dialog is opened
  useEffect(() => {
    if (open) {
      fetchSupportPageInfo(); // Fetch the data only when the dialog is opened
    }
  }, [open]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        supportPageHeader,
        supportPageIntro,
        userId: user.userId, // Patch the userId from the authenticated user
      };

      // Use the provided editSupportPageInfo API call
      await editSupportPageData(updatedData);

      // Call the onSave prop to refresh the data in the parent component
      onSave();

      // Close the dialog after saving
      onClose();
    } catch (err) {
      console.error('Failed to update support page:', err.message);
      setError('Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Support Page</DialogTitle>
      <DialogContent>
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
        <TextField
          label="Support Page Header"
          fullWidth
          margin="normal"
          value={supportPageHeader}
          onChange={(e) => setSupportPageHeader(e.target.value)}
        />
        <TextField
          label="Support Page Introduction"
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          value={supportPageIntro}
          onChange={(e) => setSupportPageIntro(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditSupportPageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditSupportPageDialog;
