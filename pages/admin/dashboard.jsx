import React, { useState, useEffect, Suspense } from 'react';
import { Box, Divider, Button } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { getAboutMe } from '../../api/aboutMeApi';
import { getMissionStatement } from '../../api/missionStatementApi';

// Lazy load the dialogs
const MissionStatementDialog = React.lazy(() => import('../../components/dialogs/MissionStatementDialog'));
const QuoteListDialog = React.lazy(() => import('../../components/dialogs/QuoteListDialog'));
const SupportOrgListDialog = React.lazy(() => import('../../components/dialogs/SupportListDialog'));
const AboutMeDialog = React.lazy(() => import('../../components/dialogs/AboutMeDialog'));

export default function Dashboard() {
  const { user } = useAuth();
  const [openAboutMeDialog, setOpenAboutMeDialog] = useState(false);
  const [openMissionStatementDialog, setOpenMissionStatementDialog] = useState(false); // For mission statement dialog
  const [aboutMeData, setAboutMeData] = useState(null);
  const [missionData, setMissionData] = useState(null); // For mission statement data

  const handleOpenAboutMeDialog = () => {
    setOpenAboutMeDialog(true);
  };

  const handleCloseAboutMeDialog = () => {
    setOpenAboutMeDialog(false);
  };

  const handleOpenMissionStatementDialog = () => {
    setOpenMissionStatementDialog(true);
  };

  const handleCloseMissionStatementDialog = () => {
    setOpenMissionStatementDialog(false);
  };

  const fetchAboutMeData = async () => {
    try {
      const data = await getAboutMe();
      setAboutMeData(data);
    } catch (err) {
      console.error('Failed to fetch About Me data', err);
    }
  };

  const fetchMissionData = async () => {
    try {
      const data = await getMissionStatement();
      setMissionData(data);
    } catch (err) {
      console.error('Failed to fetch mission statement data', err);
    }
  };

  useEffect(() => {
    fetchAboutMeData();
    fetchMissionData(); // Fetch mission statement data
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

      <Suspense fallback={<div>Loading...</div>}>
        <Box className="dashboard">
          <Button variant="contained" onClick={handleOpenMissionStatementDialog}>
            Edit Mission Statement
          </Button>
          <MissionStatementDialog
            open={openMissionStatementDialog}
            onClose={handleCloseMissionStatementDialog}
            missionData={missionData}
            refreshMissionData={fetchMissionData}
          />
        </Box>
        <Box className="dashboard">
          <QuoteListDialog userId={user?.userId} />
        </Box>
        <Box className="dashboard">
          <SupportOrgListDialog userId={user?.userId} />
        </Box>
        <Box className="dashboard">
          <Button variant="contained" onClick={handleOpenAboutMeDialog}>
            Edit About Me
          </Button>
          <AboutMeDialog
            open={openAboutMeDialog}
            onClose={handleCloseAboutMeDialog}
            aboutMeData={aboutMeData}
            refreshAboutMeData={fetchAboutMeData}
          />
        </Box>
      </Suspense>
    </Box>
  );
}
