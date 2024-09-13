import React, { useState, useEffect } from 'react';
import { Box, Divider, Button } from '@mui/material';
import QuoteListDialog from '../../components/dialogs/QuoteListDialog';
import SupportOrgListDialog from '../../components/dialogs/SupportListDialog';
import AboutMeDialog from '../../components/dialogs/AboutMeDialog';
import { useAuth } from '../../utils/context/authContext';
import { getAboutMe } from '../../api/aboutMeApi';

export default function Dashboard() {
  const { user } = useAuth();
  const token = localStorage.getItem('authToken');
  const [openAboutMeDialog, setOpenAboutMeDialog] = useState(false);
  const [aboutMeData, setAboutMeData] = useState(null);

  const handleOpenAboutMeDialog = () => {
    setOpenAboutMeDialog(true);
  };

  const handleCloseAboutMeDialog = () => {
    setOpenAboutMeDialog(false);
  };

  const fetchAboutMeData = async () => {
    try {
      const data = await getAboutMe();
      setAboutMeData(data);
    } catch (err) {
      console.error('Failed to fetch About Me data', err);
    }
  };

  useEffect(() => {
    fetchAboutMeData();
  }, []);

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
      <Box className="dashboard">
        <Button variant="contained" onClick={handleOpenAboutMeDialog}>
          Edit About Me
        </Button>
        <AboutMeDialog
          token={token}
          open={openAboutMeDialog}
          onClose={handleCloseAboutMeDialog}
          aboutMeData={aboutMeData}
          refreshAboutMeData={fetchAboutMeData}
        />
      </Box>
    </Box>
  );
}
