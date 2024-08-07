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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import Image from 'next/image';
import logo from '../../utils/data/ValVenisLogo.png';

export default function NavBar({ onAdminClick }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const NavList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* Logo at the top */}
      <Box sx={{ textAlign: 'center', my: 3 }}>
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
          { text: 'Support Organizations', href: '/organizations' },
          {
            text: 'The Trevor Project',
            href: 'https://www.thetrevorproject.org/',
          },
          {
            text: 'Advocates for Trans Equality',
            href: 'https://transequality.org/',
          },
          { text: 'Quotes', href: '/quotes' },
          { text: 'About Me', href: '/aboutme' },
        ].map(({ text, href }) => (
          <Link key={text} href={href} passHref>
            <ListItem disablePadding>
              <ListItemButton component="a">
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {/* Admin Button */}
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Button variant="contained" color="primary" onClick={onAdminClick}>
          Admin
        </Button>
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
