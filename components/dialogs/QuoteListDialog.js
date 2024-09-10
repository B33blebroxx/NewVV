import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { deleteQuote, getQuotes } from '../../api/quoteApi';
import AddQuoteDialog from './AddQuoteDialog';
import { checkUser } from '../../utils/auth';

export default function QuoteListDialog({ token, onEditQuote }) {
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isAddQuoteDialogOpen, setIsAddQuoteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchQuotesData = async () => {
      try {
        const data = await getQuotes(token);
        setQuotes(data);
      } catch (err) {
        console.error('Error fetching quotes:', err.message);
      }
    };

    fetchQuotesData();
  }, [token]);

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
    setSelectedQuote(null);
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
    if (onEditQuote) {
      onEditQuote(quote);
    }
  };

  const handleDelete = async (quoteId) => {
    try {
      await deleteQuote(quoteId, token);
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== quoteId));
    } catch (err) {
      console.error('Error deleting quote:', err.message);
    }
  };

  const handleSaveQuote = (updatedQuote) => {
    if (selectedQuote) {
      setQuotes((prevQuotes) => prevQuotes.map((quote) => (quote.id === updatedQuote.id ? updatedQuote : quote)));
    } else {
      setQuotes((prevQuotes) => [...prevQuotes, updatedQuote]);
    }
    handleCloseAddQuoteDialog();
    handleCloseListDialog(); // Make sure to only close the list dialog if it's open
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
        </DialogActions>
      </Dialog>
      <AddQuoteDialog
        token={token}
        existingQuote={selectedQuote}
        open={isAddQuoteDialogOpen}
        onCloseDialog={handleCloseAddQuoteDialog}
        userId={userId}
        onSaveQuote={(updatedQuote) => {
          handleSaveQuote(updatedQuote);
        }}
      />
    </div>
  );
}

QuoteListDialog.propTypes = {
  token: PropTypes.string.isRequired,
  onEditQuote: PropTypes.func.isRequired,
};
