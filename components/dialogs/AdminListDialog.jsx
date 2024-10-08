/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, Suspense } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DOMPurify from 'dompurify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsers, deleteUser, checkUser } from '../../utils/auth';

const AdminDialog = React.lazy(() => import('./AdminDialog'));

export default function UserListDialog() {
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  // New state for confirmation dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      // Filter to include only admin users and map to include userId
      const adminUsers = data
        .filter((user) => user.role === 'admin')
        .map((user) => ({
          ...user,
          userId: user.id, // Add userId property
        }));
      setUsers(adminUsers);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      const result = await checkUser();
      if (result.isLoggedIn) {
        setCurrentUserId(result.user.userId);
      }
    };

    fetchCurrentUserId();
  }, []);

  const handleOpenAddUserDialog = () => {
    setIsAddUserDialogOpen(true);
  };

  const handleCloseAddUserDialog = () => {
    setIsAddUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleOpenListDialog = () => {
    setIsListDialogOpen(true);
  };

  const handleCloseListDialog = () => {
    setIsListDialogOpen(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    handleOpenAddUserDialog();
  };

  const handleDeleteClick = (user) => {
    if (user.userId.toString() === currentUserId.toString()) {
      alert('You cannot delete your own account.');
      return;
    }
    setUserToDelete(user);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      await fetchUsers();
      setIsConfirmDialogOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setUserToDelete(null);
  };

  const handleSaveUser = async () => {
    await fetchUsers();
    handleCloseAddUserDialog();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenListDialog}>
        Open Admin Users List
      </Button>
      <Dialog open={isListDialogOpen} onClose={handleCloseListDialog}>
        <DialogTitle>Admin Users List</DialogTitle>
        <DialogContent>
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.username} secondary={user.email} />
                <IconButton onClick={() => handleEdit(user)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(user)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseListDialog}>Cancel</Button>
          <Button onClick={handleOpenAddUserDialog} color="primary">
            Add New Admin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete user "{DOMPurify.sanitize(userToDelete?.username)}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Suspense fallback={<div>Loading...</div>}>
        <AdminDialog
          existingUser={selectedUser}
          open={isAddUserDialogOpen}
          onCloseDialog={handleCloseAddUserDialog}
          onSaveUser={handleSaveUser}
        />
      </Suspense>
    </div>
  );
}
