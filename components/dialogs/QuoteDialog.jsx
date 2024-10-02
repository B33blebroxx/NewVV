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
} from '@mui/material';
import DOMPurify from 'dompurify';
import { addQuote, updateQuote } from '../../api/quoteApi';

export default function QuoteDialog({
  existingQuote, onCloseDialog, open, userId, onSaveQuote,
}) {
  const [quoteData, setQuoteData] = useState({ quoteText: '', quoteAuthor: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingQuote) {
      setQuoteData({
        quoteText: DOMPurify.sanitize(existingQuote.quoteText),
        quoteAuthor: DOMPurify.sanitize(existingQuote.quoteAuthor),
      });
    } else {
      setQuoteData({ quoteText: '', quoteAuthor: '' });
    }
  }, [existingQuote]);

  const handleClose = () => {
    setQuoteData({ quoteText: '', quoteAuthor: '' });
    setError('');
    if (onCloseDialog) onCloseDialog();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setQuoteData((prevData) => ({
      ...prevData,
      [id]: DOMPurify.sanitize(value),
    }));
  };

  const handleSaveQuote = async () => {
    const { quoteText, quoteAuthor } = quoteData;
    if (!quoteText || !quoteAuthor || !userId) {
      setError('Quote, author, and user ID are required');
      return;
    }

    try {
      const quotePayload = { ...quoteData, userId };

      if (existingQuote) {
        await updateQuote(existingQuote.id, quotePayload);
      } else {
        await addQuote(quotePayload);
      }

      if (onSaveQuote) {
        await onSaveQuote();
      }
      handleClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{existingQuote ? 'Edit Quote' : 'Add Quote'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="quoteText"
          label="Quote"
          type="text"
          fullWidth
          value={quoteData.quoteText}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="quoteAuthor"
          label="Author"
          type="text"
          fullWidth
          value={quoteData.quoteAuthor}
          onChange={handleInputChange}
        />
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveQuote} color="primary">
          {existingQuote ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

QuoteDialog.propTypes = {
  existingQuote: PropTypes.shape({
    id: PropTypes.number,
    quoteText: PropTypes.string,
    quoteAuthor: PropTypes.string,
  }),
  onCloseDialog: PropTypes.func,
  onSaveQuote: PropTypes.func,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

QuoteDialog.defaultProps = {
  existingQuote: null,
  onCloseDialog: null,
  onSaveQuote: null,
  userId: null,
};
