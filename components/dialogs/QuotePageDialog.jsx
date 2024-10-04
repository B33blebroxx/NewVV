import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
} from '@mui/material';
import { getQuotePageInfo, editQuotePageInfo } from '../../api/quotePageApi';
import { useAuth } from '../../utils/context/authContext'; // Assuming you have an Auth context for user info

const EditQuotePageDialog = ({ open, onClose, onSave }) => {
  const [quotePageHeader, setQuotePageHeader] = useState('');
  const [quotePageIntro, setQuotePageIntro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Fetching the current user from the Auth context

  // Function to fetch quote page info
  const fetchQuotePageInfo = async () => {
    try {
      const quotePageInfo = await getQuotePageInfo();
      setQuotePageHeader(quotePageInfo.quotePageHeader || '');
      setQuotePageIntro(quotePageInfo.quotePageIntro || '');
      setError(null); // Reset error on successful fetch
    } catch (err) {
      console.error('Failed to fetch quote page info:', err);
      setError('Failed to load quote page info');
    }
  };

  // Fetch quote page info when the dialog is opened
  useEffect(() => {
    if (open) {
      fetchQuotePageInfo(); // Fetch the data only when the dialog is opened
    }
  }, [open]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        quotePageHeader,
        quotePageIntro,
        userId: user.userId, // Patch the userId from the authenticated user
      };

      // Use the provided editQuotePageInfo API call
      await editQuotePageInfo(updatedData);

      // Call the onSave prop to refresh the data in the parent component
      onSave();

      // Close the dialog after saving
      onClose();
    } catch (err) {
      console.error('Failed to update quote page:', err.message);
      setError('Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Quote Page</DialogTitle>
      <DialogContent>
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
        <TextField
          label="Quote Page Header"
          fullWidth
          margin="normal"
          value={quotePageHeader}
          onChange={(e) => setQuotePageHeader(e.target.value)}
        />
        <TextField
          label="Quote Page Introduction"
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          value={quotePageIntro}
          onChange={(e) => setQuotePageIntro(e.target.value)}
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

EditQuotePageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditQuotePageDialog;
