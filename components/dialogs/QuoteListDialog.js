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
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [isAddQuoteDialogOpen, setIsAddQuoteDialogOpen] = useState(false);
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
  }, [fetchQuotes]);

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await checkUser();
      if (result.isLoggedIn) {
        setUserId(result.user.userId);
      }
    };

    fetchUserId();
  }, []);

  const handleOpenListDialog = () => {
    setIsListDialogOpen(true);
  };

  const handleCloseListDialog = () => {
    setIsListDialogOpen(false);
  };

  const handleOpenAddQuoteDialog = () => {
    setIsAddQuoteDialogOpen(true);
  };

  const handleCloseAddQuoteDialog = () => {
    setIsAddQuoteDialogOpen(false);
    setSelectedQuote(null);
  };

  const handleEdit = (quote) => {
    setSelectedQuote(quote);
    handleOpenAddQuoteDialog();
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
    handleCloseAddQuoteDialog();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenListDialog}>
        Open Quotes List
      </Button>
      <Dialog open={isListDialogOpen} onClose={handleCloseListDialog}>
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
          <Button onClick={handleCloseListDialog}>Close</Button>
          <Button onClick={handleOpenAddQuoteDialog} color="primary">
            Add Quote
          </Button>
        </DialogActions>
      </Dialog>
      <QuoteDialog
        token={token}
        existingQuote={selectedQuote}
        open={isAddQuoteDialogOpen}
        onCloseDialog={handleCloseAddQuoteDialog}
        userId={userId}
        onSaveQuote={handleSaveQuote}
      />
    </div>
  );
}

QuoteListDialog.propTypes = {
  token: PropTypes.string.isRequired,
};
