import React, { useState, Suspense } from 'react';
import { Box, Divider, Button } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { getAboutMe } from '../../api/aboutMeApi';
import { getMissionStatement } from '../../api/missionStatementApi';
import { getQuotePageInfo } from '../../api/quotePageApi';
import { getSupportPageData } from '../../api/supportPageApi';

const MissionStatementDialog = React.lazy(() => import('../../components/dialogs/MissionStatementDialog'));
const QuoteListDialog = React.lazy(() => import('../../components/dialogs/QuoteListDialog'));
const SupportOrgListDialog = React.lazy(() => import('../../components/dialogs/SupportListDialog'));
const AboutMeDialog = React.lazy(() => import('../../components/dialogs/AboutMeDialog'));
const EditQuotePageDialog = React.lazy(() => import('../../components/dialogs/QuotePageDialog'));
const EditSupportPageDialog = React.lazy(() => import('../../components/dialogs/SupportPageDialog'));
const AdminListDialog = React.lazy(() => import('../../components/dialogs/AdminListDialog')); // Import UserListDialog

export default function Dashboard() {
  const { user } = useAuth();
  const [openAboutMeDialog, setOpenAboutMeDialog] = useState(false);
  const [openMissionStatementDialog, setOpenMissionStatementDialog] = useState(false);
  const [openQuotePageDialog, setOpenQuotePageDialog] = useState(false);
  const [openSupportPageDialog, setOpenSupportPageDialog] = useState(false);

  const [aboutMeData, setAboutMeData] = useState(null);
  const [missionData, setMissionData] = useState(null);
  const [quotePageData, setQuotePageData] = useState(null);
  const [supportPageData, setSupportPageData] = useState(null);

  // Fetch About Me data before opening the dialog
  const handleOpenAboutMeDialog = async () => {
    try {
      const data = await getAboutMe(); // Fetch the About Me data
      setAboutMeData(data); // Set the fetched data
      setOpenAboutMeDialog(true); // Open the dialog only after data is set
    } catch (err) {
      console.error('Failed to fetch About Me data', err);
    }
  };
  const handleCloseAboutMeDialog = () => setOpenAboutMeDialog(false);

  const handleOpenMissionStatementDialog = async () => {
    try {
      const data = await getMissionStatement();
      setMissionData(data);
      setOpenMissionStatementDialog(true);
    } catch (err) {
      console.error('Failed to fetch mission statement data', err);
    }
  };
  const handleCloseMissionStatementDialog = () => setOpenMissionStatementDialog(false);

  const handleOpenQuotePageDialog = async () => {
    try {
      const data = await getQuotePageInfo();
      setQuotePageData(data);
      setOpenQuotePageDialog(true);
    } catch (error) {
      console.error('Failed to fetch quote page data', error);
    }
  };
  const handleCloseQuotePageDialog = () => setOpenQuotePageDialog(false);

  const handleOpenSupportPageDialog = async () => {
    try {
      const data = await getSupportPageData();
      setSupportPageData(data);
      setOpenSupportPageDialog(true);
    } catch (error) {
      console.error('Failed to fetch support page data', error);
    }
  };
  const handleCloseSupportPageDialog = () => setOpenSupportPageDialog(false);

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
            refreshMissionData={handleOpenMissionStatementDialog}
          />
        </Box>
        <Box className="dashboard">
          <QuoteListDialog userId={user?.userId} />
        </Box>
        <Box className="dashboard">
          <SupportOrgListDialog userId={user?.userId} />
        </Box>
        <Box className="dashboard">
          <AdminListDialog /> {/* Integrated UserListDialog */}
        </Box>
        <Box className="dashboard">
          <Button variant="contained" onClick={handleOpenAboutMeDialog}>
            Edit About Me
          </Button>
          <AboutMeDialog
            open={openAboutMeDialog}
            onClose={handleCloseAboutMeDialog}
            aboutMeData={aboutMeData}
            refreshAboutMeData={handleOpenAboutMeDialog}
          />
          <Divider sx={{ backgroundColor: 'black', margin: '20px 0' }} />
        </Box>
        <Box className="dashboard">
          <Button variant="contained" color="secondary" onClick={handleOpenQuotePageDialog}>
            Edit Quote Page
          </Button>
          <EditQuotePageDialog
            open={openQuotePageDialog}
            onClose={handleCloseQuotePageDialog}
            quotePageData={quotePageData}
            onSave={handleCloseQuotePageDialog}
          />
        </Box>
        <Box className="dashboard">
          <Button variant="contained" color="secondary" onClick={handleOpenSupportPageDialog}>
            Edit Support Page
          </Button>
          <EditSupportPageDialog
            open={openSupportPageDialog}
            onClose={handleCloseSupportPageDialog}
            supportPageData={supportPageData}
            onSave={handleCloseSupportPageDialog}
          />
        </Box>
      </Suspense>
    </Box>
  );
}
