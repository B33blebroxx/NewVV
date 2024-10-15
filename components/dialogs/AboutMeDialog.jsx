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
import { editAboutMe } from '../../api/aboutMeApi';
import { checkUser } from '../../utils/auth'; // Import checkUser API

export default function AboutMeDialog({
  open,
  onClose,
  aboutMeData,
  refreshAboutMeData,
}) {
  const [aboutMeHeader, setAboutMeHeader] = useState('');
  const [aboutMeText, setAboutMeText] = useState('');
  const [aboutMeImage, setAboutMeImage] = useState('');
  const [aboutMeProfileLink, setAboutMeProfileLink] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (aboutMeData && open) {
      setAboutMeHeader(DOMPurify.sanitize(aboutMeData.aboutMeHeader || ''));
      setAboutMeText(DOMPurify.sanitize(aboutMeData.aboutMeText || ''));
      setAboutMeImage(DOMPurify.sanitize(aboutMeData.aboutMeImage || ''));
      setAboutMeProfileLink(DOMPurify.sanitize(aboutMeData.aboutMeProfileLink || ''));
    }
  }, [aboutMeData, open]);

  useEffect(() => {
    // Fetch userId using checkUser API when the dialog opens
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
  }, [userId, open]);

  const handleClose = () => {
    setError('');
    if (onClose) onClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutMeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!aboutMeHeader || !aboutMeText || !userId) {
      setError('Header, text, and user ID are required');
      return;
    }

    try {
      const aboutMeDataToSave = {
        aboutMeHeader: DOMPurify.sanitize(aboutMeHeader),
        aboutMeText: DOMPurify.sanitize(aboutMeText),
        aboutMeImage: DOMPurify.sanitize(aboutMeImage),
        aboutMeProfileLink: DOMPurify.sanitize(aboutMeProfileLink),
        userId,
      };

      await editAboutMe(aboutMeDataToSave);

      if (refreshAboutMeData) {
        await refreshAboutMeData();
      }

      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to save About Me data');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit About Me Page</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="aboutMeHeader"
          label="Header"
          type="text"
          fullWidth
          helperText="This edits the text at the top of the About Me page"
          value={aboutMeHeader}
          onChange={(e) => setAboutMeHeader(e.target.value)}
        />
        <TextField
          margin="dense"
          id="aboutMeText"
          label="Text"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={aboutMeText}
          onChange={(e) => setAboutMeText(e.target.value)}
        />
        <TextField
          margin="dense"
          id="aboutMeProfileLink"
          label="Profile Link"
          type="url"
          fullWidth
          value={aboutMeProfileLink}
          onChange={(e) => setAboutMeProfileLink(e.target.value)}
        />
        <Input
          type="file"
          accept="image/*"
          id="aboutMeImage"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="aboutMeImage">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        {aboutMeImage && (
          <Image
            src={aboutMeImage}
            alt="About Me Image"
            style={{ maxWidth: '100%', marginTop: '10px' }}
          />
        )}
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

AboutMeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  aboutMeData: PropTypes.shape({
    aboutMeHeader: PropTypes.string,
    aboutMeText: PropTypes.string,
    aboutMeImage: PropTypes.string,
    aboutMeProfileLink: PropTypes.string,
  }),
  refreshAboutMeData: PropTypes.func,
};

AboutMeDialog.defaultProps = {
  aboutMeData: null,
  refreshAboutMeData: null,
};
