import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const UserProfile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: '',
    email: ''
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile');
        setProfile({
          username: response.data.username,
          email: response.data.email
        });
      } catch (error) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/user/profile', {
        username: profile.username,
        email: profile.email
      });
      setProfile(response.data);
      updateUser(response.data);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
      setSuccess('');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setError('New passwords do not match');
      return;
    }

    try {
      await axios.put('http://localhost:5000/api/user/profile', {
        currentPassword: password.current,
        newPassword: password.new
      });
      setPassword({ current: '', new: '', confirm: '' });
      setSuccess('Password changed successfully');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password');
      setSuccess('');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/api/user/profile');
      await logout();
      navigate('/');
    } catch (error) {
      setError('Failed to delete account');
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Paper className="p-6 bg-white bg-opacity-95 backdrop-filter backdrop-blur-lg shadow-2xl rounded-2xl">
          <Typography variant="h4" className="mb-6 text-gray-800">
            User Profile
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="mb-4">
              {success}
            </Alert>
          )}

          {/* Profile Update Form */}
          <form onSubmit={handleProfileUpdate}>
            <Typography variant="h6" className="mb-4 text-gray-700">
              Update Profile
            </Typography>
            <TextField
              fullWidth
              label="Username"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            >
              Update Profile
            </Button>
          </form>

          <Divider className="my-8" />

          {/* Password Change Form */}
          <form onSubmit={handlePasswordChange}>
            <Typography variant="h6" className="mb-4 text-gray-700">
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={password.current}
              onChange={(e) => setPassword({ ...password, current: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={password.new}
              onChange={(e) => setPassword({ ...password, new: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={password.confirm}
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            >
              Change Password
            </Button>
          </form>

          <Divider className="my-8" />

          {/* Delete Account Section */}
          <Box className="flex justify-between items-center">
            <Typography variant="h6" className="text-gray-700">
              Delete Account
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialog(true)}
            >
              Delete Account
            </Button>
          </Box>

          {/* Delete Account Confirmation Dialog */}
          <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete your account? This action cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
              <Button onClick={handleDeleteAccount} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    </Box>
  );
};

export default UserProfile; 