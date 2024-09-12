import React, { useState, useCallback } from 'react';
import { Box, Button, Divider } from '@mui/material';
import QuoteDialog from '../../components/dialogs/QuoteDialog';
import QuoteListDialog from '../../components/dialogs/QuoteListDialog';
import { checkTokenAndRedirect } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext'; // Assuming you have an AuthContext

export default function Dashboard() {
  const [dialogState, setDialogState] = useState({
    isDialogOpen: false,
    selectedQuote: null,
  });
  const { user } = useAuth(); // Use the AuthContext to get the user
  const token = localStorage.getItem('authToken');

  const handleOpenDialog = useCallback(() => {
    if (checkTokenAndRedirect(token)) {
      setDialogState((prev) => ({ ...prev, isDialogOpen: true }));
    }
  }, [token]);

  const handleCloseDialog = useCallback(() => {
    setDialogState({ isDialogOpen: false, selectedQuote: null });
  }, []);

  const handleEditQuote = useCallback((quote) => {
    if (checkTokenAndRedirect(token)) {
      setDialogState({ isDialogOpen: true, selectedQuote: quote });
    }
  }, [token]);

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
        <QuoteDialog
          token={token}
          existingQuote={dialogState.selectedQuote}
          open={dialogState.isDialogOpen}
          onCloseDialog={handleCloseDialog}
          userId={user?.userId}
        />
        <QuoteListDialog token={token} onEditQuote={handleEditQuote} />
      </Box>
    </Box>
  );
}
