import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import DOMPurify from 'dompurify';
import { checkUser } from '../../utils/auth';
import { editMissionStatement } from '../../api/missionStatementApi';

export default function MissionStatementDialog({
  open,
  onClose,
  missionData,
  refreshMissionData,
}) {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [missionStatementText, setMissionStatementText] = useState('');
  const [missionStatementAcronym, setMissionStatementAcronym] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (missionData && open) {
      setWelcomeMessage(DOMPurify.sanitize(missionData.welcomeMessage || ''));
      setMissionStatementText(DOMPurify.sanitize(missionData.missionStatementText || ''));
      setMissionStatementAcronym(DOMPurify.sanitize(missionData.missionStatementAcronym || ''));
    }
  }, [missionData, open]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const data = await checkUser();
        if (data && data.user && data.user.userId) {
          setUserId(data.user.userId);
        } else {
          setError('Failed to retrieve user ID');
        }
      } catch (err) {
        setError('Failed to retrieve user ID');
      }
    };

    if (open) {
      fetchUserId();
    }
  }, [open]);

  const handleClose = () => {
    setError('');
    if (onClose) onClose();
  };

  const handleSave = async () => {
    if (!welcomeMessage || !missionStatementText || !missionStatementAcronym || !userId) {
      setError('All fields are required');
      return;
    }

    try {
      const missionDataToSave = {
        welcomeMessage: DOMPurify.sanitize(welcomeMessage),
        missionStatementText: DOMPurify.sanitize(missionStatementText),
        missionStatementAcronym: DOMPurify.sanitize(missionStatementAcronym),
        userId,
      };

      await editMissionStatement(missionDataToSave);

      // Refresh the parent component's data
      if (refreshMissionData) {
        await refreshMissionData();
      }

      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to save landing page data');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Landing Page</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="welcomeMessage"
          label="Welcome Message"
          type="text"
          fullWidth
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
        />
        <TextField
          margin="dense"
          id="missionStatementText"
          label="Mission Statement Text"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={missionStatementText}
          onChange={(e) => setMissionStatementText(e.target.value)}
        />
        <TextField
          margin="dense"
          id="missionStatementAcronym"
          label="Mission Statement Acronym"
          type="text"
          fullWidth
          value={missionStatementAcronym}
          onChange={(e) => setMissionStatementAcronym(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={!userId}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MissionStatementDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  missionData: PropTypes.shape({
    welcomeMessage: PropTypes.string,
    missionStatementText: PropTypes.string,
    missionStatementAcronym: PropTypes.string,
  }),
  refreshMissionData: PropTypes.func,
};

MissionStatementDialog.defaultProps = {
  missionData: null,
  refreshMissionData: null,
};
