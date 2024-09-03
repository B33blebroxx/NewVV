import {
  Alert,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import { useState } from 'react';
import { addQuote } from '../../api/quoteApi';

export default function AddQuoteDialog() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddQuote = async () => {
    if (!quote || !author || !userId) {
      setError('Quote, author, and user ID are required');
      return;
    }

    const newQuote = {
      QuoteText: quote,
      QuoteAuthor: author,
      UserId: userId,
    };
    await addQuote(newQuote);
    setQuote('');
    setAuthor('');
    setUserId('');
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Quote
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Quote</DialogTitle>
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
          <TextField
            margin="dense"
            id="userId"
            label="User ID"
            type="text"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddQuote} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
