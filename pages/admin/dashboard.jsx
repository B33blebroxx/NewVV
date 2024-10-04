import React, { useState, Suspense } from 'react';
import { Box, Divider, Button } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { getAboutMe } from '../../api/aboutMeApi';
import { getMissionStatement } from '../../api/missionStatementApi';
import { getQuotePageInfo } from '../../api/quotePageApi'; // Import the API call for Quote Page
import { getSupportPageData } from '../../api/supportPageApi'; // Import the API call for Support Page

// Lazy load the dialogs
const MissionStatementDialog = React.lazy(() => import('../../components/dialogs/MissionStatementDialog'));
const QuoteListDialog = React.lazy(() => import('../../components/dialogs/QuoteListDialog'));
const SupportOrgListDialog = React.lazy(() => import('../../components/dialogs/SupportListDialog'));
const AboutMeDialog = React.lazy(() => import('../../components/dialogs/AboutMeDialog'));
const EditQuotePageDialog = React.lazy(() => import('../../components/dialogs/QuotePageDialog'));
const EditSupportPageDialog = React.lazy(() => import('../../components/dialogs/SupportPageDialog'));

export default function Dashboard() {
  const { user } = useAuth();
  const [openAboutMeDialog, setOpenAboutMeDialog] = useState(false);
  const [openMissionStatementDialog, setOpenMissionStatementDialog] = useState(false);
  const [openQuotePageDialog, setOpenQuotePageDialog] = useState(false); // For QuotePage dialog
  const [openSupportPageDialog, setOpenSupportPageDialog] = useState(false); // For SupportPage dialog

  // State to hold page data only when needed
  const [aboutMeData, setAboutMeData] = useState(null);
  const [missionData, setMissionData] = useState(null);
  const [quotePageData, setQuotePageData] = useState(null);
  const [supportPageData, setSupportPageData] = useState(null);

  const handleOpenAboutMeDialog = () => setOpenAboutMeDialog(true);
  const handleCloseAboutMeDialog = () => setOpenAboutMeDialog(false);

  const handleOpenMissionStatementDialog = () => setOpenMissionStatementDialog(true);
  const handleCloseMissionStatementDialog = () => setOpenMissionStatementDialog(false);

  const handleOpenQuotePageDialog = async () => {
    try {
      const data = await getQuotePageInfo(); // Fetch Quote Page info only when opening
      setQuotePageData(data);
      setOpenQuotePageDialog(true);
    } catch (error) {
      console.error('Failed to fetch quote page data', error);
    }
  };
  const handleCloseQuotePageDialog = () => setOpenQuotePageDialog(false);

  const handleOpenSupportPageDialog = async () => {
    try {
      const data = await getSupportPageData(); // Fetch Support Page info only when opening
      setSupportPageData(data);
      setOpenSupportPageDialog(true);
    } catch (error) {
      console.error('Failed to fetch support page data', error);
    }
  };
  const handleCloseSupportPageDialog = () => setOpenSupportPageDialog(false);

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
          <Divider sx={{ backgroundColor: 'black', margin: '20px 0' }} />
        </Box>
        {/* Button and Dialog for Editing Quote Page */}
        <Box className="dashboard">
          <Button variant="contained" color="secondary" onClick={handleOpenQuotePageDialog}>
            Edit Quote Page
          </Button>
          <EditQuotePageDialog
            open={openQuotePageDialog}
            onClose={handleCloseQuotePageDialog}
            quotePageData={quotePageData} // Pass the fetched quote page data here
            onSave={handleCloseQuotePageDialog} // Close after saving
          />
        </Box>

        {/* Button and Dialog for Editing Support Page */}
        <Box className="dashboard">
          <Button variant="contained" color="secondary" onClick={handleOpenSupportPageDialog}>
            Edit Support Page
          </Button>
          <EditSupportPageDialog
            open={openSupportPageDialog}
            onClose={handleCloseSupportPageDialog}
            supportPageData={supportPageData} // Pass the fetched support page data here
            onSave={handleCloseSupportPageDialog} // Close after saving
          />
        </Box>
      </Suspense>
    </Box>
  );
}
