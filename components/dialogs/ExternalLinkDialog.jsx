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
import { addExternalLink, editExternalLink } from '../../api/externalLinkApi';
import { useAuth } from '../../utils/context/authContext';
import { useExternalLinks } from '../../utils/context/externalLinksContext';

export default function ExternalLinkDialog({
  open, onClose, linkData, refreshLinks,
}) {
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { refreshExternalLinks } = useExternalLinks();

  useEffect(() => {
    if (linkData) {
      setLinkName(linkData.linkName || '');
      setLinkUrl(linkData.linkUrl || '');
    } else {
      setLinkName('');
      setLinkUrl('');
    }
  }, [linkData]);

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleSave = async () => {
    if (!linkName || !linkUrl) {
      setError('Link name and URL are required');
      return;
    }

    try {
      const sanitizedName = DOMPurify.sanitize(linkName);
      const sanitizedUrl = DOMPurify.sanitize(linkUrl);

      const linkDataToSave = {
        linkName: sanitizedName,
        linkUrl: sanitizedUrl,
        userId: user.userId,
      };

      if (linkData && linkData.id) {
        linkDataToSave.id = linkData.id;
        await editExternalLink(linkDataToSave);
      } else {
        await addExternalLink(linkDataToSave);
      }

      if (refreshLinks) {
        await refreshLinks();
      }

      await refreshExternalLinks();

      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to save external link');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{linkData ? 'Edit External Link' : 'Add External Link'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="linkName"
          label="Link Name"
          type="text"
          fullWidth
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="linkUrl"
          label="URL"
          type="url"
          fullWidth
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ExternalLinkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  linkData: PropTypes.shape({
    id: PropTypes.number,
    linkName: PropTypes.string,
    linkUrl: PropTypes.string,
  }),
  refreshLinks: PropTypes.func,
};

ExternalLinkDialog.defaultProps = {
  linkData: null,
  refreshLinks: null,
};
