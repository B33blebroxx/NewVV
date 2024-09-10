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
import { addQuote, updateQuote } from '../../api/quoteApi';

export default function AddQuoteDialog({
  token, existingQuote, onCloseDialog, open, userId,
}) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingQuote) {
      setQuote(existingQuote.quoteText);
      setAuthor(existingQuote.quoteAuthor);
    } else {
      setQuote('');
      setAuthor('');
    }
  }, [existingQuote]);

  const handleClose = () => {
    if (onCloseDialog) onCloseDialog();
  };

  const handleSaveQuote = async () => {
    if (!quote || !author || !userId) {
      setError('Quote, author, and user ID are required');
      return;
    }

    try {
      const quoteData = {
        quoteText: quote,
        quoteAuthor: author,
        userId,
      };

      if (existingQuote) {
        await updateQuote(existingQuote.id, quoteData, token);
      } else {
        await addQuote(quoteData, token);
      }

      setQuote('');
      setAuthor('');
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
          id="quote"
          label="Quote"
          type="text"
          fullWidth
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <TextField
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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

AddQuoteDialog.propTypes = {
  token: PropTypes.string.isRequired,
  existingQuote: PropTypes.shape({
    id: PropTypes.string,
    quoteText: PropTypes.string,
    quoteAuthor: PropTypes.string,
  }),
  onCloseDialog: PropTypes.func,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

AddQuoteDialog.defaultProps = {
  existingQuote: null,
  onCloseDialog: null,
  userId: null,
};
