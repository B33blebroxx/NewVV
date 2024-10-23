import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Button,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import Image from 'next/image';
import logo from '../../utils/data/ValVenisLogo.png';
import transFlag from '../../utils/data/TransFlagVertical.jpg';
import { useAuth } from '../../utils/context/authContext';
import SignInDialog from '../dialogs/SignInDialog';
import { useExternalLinks } from '../../utils/context/externalLinksContext';

export default function NavBar({ onAdminClick }) {
  const { user, signOut } = useAuth();
  const { externalLinks, refreshExternalLinks } = useExternalLinks();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = React.useState(false);

  React.useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  React.useEffect(() => {
    refreshExternalLinks();
  }, [refreshExternalLinks]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      onAdminClick();
    } else {
      setSignInDialogOpen(true);
    }
  };

  const handleSignInDialogClose = () => {
    setSignInDialogOpen(false);
  };

  const NavList = (
    <Box
      sx={{
        width: 250,
        backgroundImage: `url(${transFlag.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '100%',
        '& a': {
          textDecoration: 'none',
          color: 'inherit',
        },
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Image
          src={logo}
          alt="Logo"
          width={175}
          height={125}
          style={{ marginBottom: '20px' }}
        />
      </Box>
      <List>
        {/* Existing static links */}
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton component="a">
              <Button variant="outlined" style={{ borderWidth: '2px' }} fullWidth>
                <Typography variant="body1" sx={{ textTransform: 'none' }}>
                  Home
                </Typography>
              </Button>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="../support-organizations/all" passHref style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton component="a">
              <Button variant="outlined" style={{ borderWidth: '2px' }} fullWidth>
                <Typography variant="body1" sx={{ textTransform: 'none' }}>
                  Support Organizations
                </Typography>
              </Button>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="../quotes/all" passHref style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton component="a">
              <Button variant="outlined" style={{ borderWidth: '2px' }} fullWidth>
                <Typography variant="body1" sx={{ textTransform: 'none' }}>
                  Quotes
                </Typography>
              </Button>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/aboutMe" passHref style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton component="a">
              <Button variant="outlined" style={{ borderWidth: '2px' }} fullWidth>
                <Typography variant="body1" sx={{ textTransform: 'none' }}>
                  About Me
                </Typography>
              </Button>
            </ListItemButton>
          </ListItem>
        </Link>

        {/* Dynamically rendered external links from the backend */}
        {externalLinks.map((link) => (
          <ListItem key={link.id} disablePadding>
            <ListItemButton component="a" href={link.linkUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outlined" style={{ borderWidth: '2px' }} fullWidth>
                <Typography variant="body1" sx={{ textTransform: 'none' }}>
                  {link.linkName}
                </Typography>
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: 3,
        }}
      >
        <Tooltip title={isLoggedIn ? 'Admin Dashboard' : 'Sign In'}>
          <Button variant="outlined" sx={{ borderWidth: '2px' }} color="primary" onClick={handleAdminClick}>
            <AdminPanelSettingsSharpIcon />
          </Button>
        </Tooltip>
        {isLoggedIn && (
          <Tooltip title="Logout">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
              sx={{ mt: 2 }}
              style={{ borderWidth: '2px' }}
            >
              <LogoutIcon />
            </Button>
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          padding: '16px',
          fontSize: '2rem',
        }}
      >
        <MenuIcon fontSize="inherit" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {NavList}
      </Drawer>
      <SignInDialog
        open={signInDialogOpen}
        onClose={handleSignInDialogClose}
      />
    </div>
  );
}

NavBar.propTypes = {
  onAdminClick: PropTypes.func.isRequired,
};
