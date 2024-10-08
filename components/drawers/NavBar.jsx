import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import Image from 'next/image';
import logo from '../../utils/data/ValVenisLogo.png';
import { useAuth } from '../../utils/context/authContext';
import SignInDialog from '../dialogs/SignInDialog';

export default function NavBar({ onAdminClick }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = React.useState(false);

  React.useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

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
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
        {[
          { text: 'Home', href: '/' },
          { text: 'Support Organizations', href: '../support-organizations/all' },
          {
            text: 'The Trevor Project',
            href: 'https://www.thetrevorproject.org/',
          },
          {
            text: 'Advocates for Trans Equality',
            href: 'https://transequality.org/',
          },
          { text: 'Quotes', href: '../quotes/all' },
          { text: 'About Me', href: '/aboutMe' },
          { text: 'Shop', href: 'https://val-venis.printify.me/products' },
        ].map(({ text, href }) => (
          <Link key={text} href={href} passHref>
            <ListItem disablePadding>
              <ListItemButton component="a">
                <ListItemText primary={text} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {isLoggedIn && (
          <Link key="admin-dashboard" href="/admin/dashboard" passHref>
            <ListItem disablePadding>
              <ListItemButton component="a" onClick={handleAdminClick}>
                <ListItemText primary="Admin Dashboard" sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: 3,
        }}
      >
        <Tooltip title={isLoggedIn ? 'Admin Dashboard' : 'Sign In'}>
          <Button variant="outlined" color="primary" onClick={handleAdminClick}>
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
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
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
