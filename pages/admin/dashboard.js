import React from 'react';
import { Box, Divider } from '@mui/material';
import QuoteListDialog from '../../components/dialogs/QuoteListDialog';
import SupportOrgListDialog from '../../components/dialogs/SupportListDialog';
import { useAuth } from '../../utils/context/authContext';

export default function Dashboard() {
  const { user } = useAuth();
  const token = localStorage.getItem('authToken');

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
        <QuoteListDialog
          token={token}
          userId={user?.userId}
        />
      </Box>
      <Box className="dashboard">
        <SupportOrgListDialog
          token={token}
          userId={user?.userId}
        />
      </Box>
    </Box>
  );
}
