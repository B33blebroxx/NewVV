import React, {
  useState, useEffect, useCallback, Suspense,
} from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DOMPurify from 'dompurify';
import { deleteExternalLink, getExternalLinks } from '../../api/externalLinkApi';
import { checkUser } from '../../utils/auth';

// Lazy load the ExternalLinkDialog component
const ExternalLinkDialog = React.lazy(() => import('./ExternalLinkDialog'));

export default function ExternalLinkListDialog() {
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [externalLinks, setExternalLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);

  const fetchExternalLinks = useCallback(async () => {
    try {
      const data = await getExternalLinks();
      const sanitizedLinks = data.map((link) => ({
        ...link,
        linkText: DOMPurify.sanitize(link.linkText),
        linkUrl: DOMPurify.sanitize(link.linkUrl),
      }));
      setExternalLinks(sanitizedLinks);
    } catch (err) {
      console.error('Error fetching external links:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchExternalLinks();
  }, [fetchExternalLinks]);

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await checkUser();
      if (result.isLoggedIn) {
        setUserId(result.user.userId);
      }
    };

    fetchUserId();
  }, []);

  const handleOpenListDialog = () => {
    setIsListDialogOpen(true);
  };

  const handleCloseListDialog = () => {
    setIsListDialogOpen(false);
  };

  const handleOpenAddLinkDialog = () => {
    setIsAddLinkDialogOpen(true);
  };

  const handleCloseAddLinkDialog = () => {
    setIsAddLinkDialogOpen(false);
    setSelectedLink(null);
  };

  const handleEdit = (link) => {
    setSelectedLink(link);
    handleOpenAddLinkDialog();
  };

  const handleDelete = async (linkId) => {
    try {
      await deleteExternalLink(linkId);
      await fetchExternalLinks();
    } catch (err) {
      console.error('Error deleting external link:', err.message);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenListDialog}>
        Open External Links List
      </Button>
      <Dialog open={isListDialogOpen} onClose={handleCloseListDialog}>
        <DialogTitle>External Links List</DialogTitle>
        <DialogContent>
          <List>
            {externalLinks.map((link) => (
              <ListItem key={link.id}>
                <ListItemText primary={link.linkText} secondary={link.linkUrl} />
                <IconButton onClick={() => handleEdit(link)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(link.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseListDialog}>Close</Button>
          <Button onClick={handleOpenAddLinkDialog} color="primary">
            Add External Link
          </Button>
        </DialogActions>
      </Dialog>
      <Suspense fallback={<div>Loading...</div>}>
        <ExternalLinkDialog
          linkData={selectedLink}
          open={isAddLinkDialogOpen}
          onClose={handleCloseAddLinkDialog}
          userId={userId}
          refreshLinks={fetchExternalLinks}
        />
      </Suspense>
    </div>
  );
}
