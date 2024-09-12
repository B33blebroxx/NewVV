import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { deleteQuote, getQuotes } from '../../api/quoteApi';
import QuoteDialog from './QuoteDialog';
import { checkUser } from '../../utils/auth';

export default function QuoteListDialog({ token }) {
  const [dialogState, setDialogState] = useState({
    isListDialogOpen: false,
    isAddQuoteDialogOpen: false,
  });
  const [userId, setUserId] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const fetchQuotes = useCallback(async () => {
    try {
      const data = await getQuotes();
      setQuotes(data);
    } catch (err) {
      console.error('Error fetching quotes:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes, quotes]);

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await checkUser();
      if (result.isLoggedIn) {
        setUserId(result.user.userId);
      }
    };

    fetchUserId();
  }, []);

  const toggleDialog = (dialogType, isOpen) => {
    setDialogState((prevState) => ({
      ...prevState,
      [dialogType]: isOpen,
    }));
  };

  const handleEdit = (quote) => {
    setSelectedQuote(quote);
    toggleDialog('isAddQuoteDialogOpen', true);
  };

  const handleDelete = async (quoteId) => {
    try {
      await deleteQuote(quoteId, token);
      await fetchQuotes();
    } catch (err) {
      console.error('Error deleting quote:', err.message);
    }
  };

  const handleSaveQuote = async () => {
    await fetchQuotes();
    toggleDialog('isAddQuoteDialogOpen', false);
    setSelectedQuote(null);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => toggleDialog('isListDialogOpen', true)}>
        Open Quotes List
      </Button>
      <Dialog open={dialogState.isListDialogOpen} onClose={() => toggleDialog('isListDialogOpen', false)}>
        <DialogTitle>Quotes List</DialogTitle>
        <DialogContent>
          <List>
            {quotes.map((quote) => (
              <ListItem key={quote.id}>
                <ListItemText primary={quote.quoteText} secondary={quote.quoteAuthor} />
                <IconButton onClick={() => handleEdit(quote)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(quote.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialog('isListDialogOpen', false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <QuoteDialog
        token={token}
        existingQuote={selectedQuote}
        open={dialogState.isAddQuoteDialogOpen}
        onCloseDialog={() => toggleDialog('isAddQuoteDialogOpen', false)}
        userId={userId}
        onSaveQuote={handleSaveQuote}
      />
    </div>
  );
}

QuoteListDialog.propTypes = {
  token: PropTypes.string.isRequired,
};
