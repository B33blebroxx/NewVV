import React, { useState, useEffect } from 'react';
import { Box, Button, Divider } from '@mui/material';
import AddQuoteDialog from '../../components/dialogs/AddQuoteDialog';
import QuoteListDialog from '../../components/dialogs/QuoteListDialog';
import { checkUser } from '../../utils/auth';

export default function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [userId, setUserId] = useState(null); // Add state for userId
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUser = async () => {
      const result = await checkUser();
      if (result.isLoggedIn) {
        setUserId(result.user.userId); // Set userId from checkUser result
      }
    };

    fetchUser();
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedQuote(null);
  };

  const handleEditQuote = (quote) => {
    setSelectedQuote(quote);
    setIsDialogOpen(true);
  };

  return (
    <Box id="dashboard-container">
      <Box className="dashboard">
        <br /><br />
        <h1>Admin Dashboard</h1>
        <br />
        <Divider sx={{ backgroundColor: 'black' }} />
        <br /><br />
      </Box>
      <Box className="dashboard">
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add Quote
        </Button>
      </Box>
      <Box className="dashboard">
        <AddQuoteDialog
          token={token}
          existingQuote={selectedQuote}
          open={isDialogOpen}
          onCloseDialog={handleCloseDialog}
          userId={userId}
        />
        <QuoteListDialog token={token} onEditQuote={handleEditQuote} />
      </Box>
    </Box>
  );
}
