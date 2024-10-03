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
  Input,
} from '@mui/material';
import { Image } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import { createOrg, updateOrg } from '../../api/supportOrgApi';

export default function SupportOrgDialog({
  existingOrg, onCloseDialog, open, userId, onSaveOrg,
}) {
  const [orgName, setOrgName] = useState('');
  const [orgSummary, setOrgSummary] = useState('');
  const [orgPhone, setOrgPhone] = useState('');
  const [orgUrl, setOrgUrl] = useState('');
  const [orgLogo, setOrgLogo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingOrg) {
      setOrgName(DOMPurify.sanitize(existingOrg.supportOrgName));
      setOrgSummary(DOMPurify.sanitize(existingOrg.supportOrgSummary));
      setOrgPhone(DOMPurify.sanitize(existingOrg.supportOrgPhone));
      setOrgUrl(DOMPurify.sanitize(existingOrg.supportOrgUrl));
      setOrgLogo(DOMPurify.sanitize(existingOrg.supportOrgLogo));
    } else {
      setOrgName('');
      setOrgSummary('');
      setOrgPhone('');
      setOrgUrl('');
      setOrgLogo('');
    }
  }, [existingOrg]);

  const handleClose = () => {
    setOrgName('');
    setOrgSummary('');
    setOrgPhone('');
    setOrgUrl('');
    setOrgLogo('');
    setError('');
    if (onCloseDialog) onCloseDialog();
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrgLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveOrg = async () => {
    if (!orgName || !userId) {
      setError('Organization name and user ID are required');
      return;
    }

    try {
      const orgData = {
        supportOrgName: DOMPurify.sanitize(orgName),
        supportOrgSummary: DOMPurify.sanitize(orgSummary),
        supportOrgPhone: DOMPurify.sanitize(orgPhone),
        supportOrgUrl: DOMPurify.sanitize(orgUrl),
        supportOrgLogo: DOMPurify.sanitize(orgLogo),
        userId,
      };

      if (existingOrg) {
        await updateOrg({ ...orgData, id: existingOrg.id });
      } else {
        await createOrg(orgData);
      }

      if (onSaveOrg) {
        await onSaveOrg();
      }
      handleClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{existingOrg ? 'Edit Support Organization' : 'Add Support Organization'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="orgName"
          label="Organization Name"
          type="text"
          fullWidth
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="orgSummary"
          label="Summary"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={orgSummary}
          onChange={(e) => setOrgSummary(e.target.value)}
        />
        <TextField
          margin="dense"
          id="orgPhone"
          label="Phone"
          type="tel"
          fullWidth
          value={orgPhone}
          onChange={(e) => setOrgPhone(e.target.value)}
        />
        <TextField
          margin="dense"
          id="orgUrl"
          label="Website URL"
          type="url"
          fullWidth
          value={orgUrl}
          onChange={(e) => setOrgUrl(e.target.value)}
        />
        <Input
          type="file"
          accept="image/*"
          id="orgLogo"
          onChange={handleLogoUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="orgLogo">
          <Button variant="contained" component="span">
            Upload Logo
          </Button>
        </label>
        {orgLogo && <Image src={orgLogo} alt="Organization Logo" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveOrg} color="primary">
          {existingOrg ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SupportOrgDialog.propTypes = {
  existingOrg: PropTypes.shape({
    id: PropTypes.number,
    supportOrgName: PropTypes.string,
    supportOrgSummary: PropTypes.string,
    supportOrgPhone: PropTypes.string,
    supportOrgUrl: PropTypes.string,
    supportOrgLogo: PropTypes.string,
  }),
  onCloseDialog: PropTypes.func,
  onSaveOrg: PropTypes.func,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

SupportOrgDialog.defaultProps = {
  existingOrg: null,
  onCloseDialog: null,
  onSaveOrg: null,
  userId: null,
};
