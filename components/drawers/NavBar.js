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
import PropTypes from 'prop-types';
import Image from 'next/image';
import logo from '../../utils/data/ValVenisLogo.png';

// This component is a collapsible navigation bar that appears on the left side of the screen when the user clicks the menu icon. It includes internal and external links to various pages on the site, as well as a button that opens the admin panel.
export default function NavBar({ onAdminClick }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const NavList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* Logo at the top */}
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
      </List>
      <Divider />
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3,
      }}
      >
        <Tooltip title="Admin">
          <Button variant="outlined" color="primary" onClick={onAdminClick}>
            <AdminPanelSettingsSharpIcon />
          </Button>
        </Tooltip>
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
    </div>
  );
}

NavBar.propTypes = {
  onAdminClick: PropTypes.func.isRequired,
};
