import React from 'react';
import { Divider } from '@mui/material';
import AccordionUsage from '../../components/accordians/OrgAcordian';

export default function SupportOrganizationsPage() {
  return (
    <div>
      <br /><br />
      <h1 style={{ textAlign: 'center' }}>Support Organizations</h1>
      <br />
      <h6 style={{ textAlign: 'center' }}>Welcome to our Support Organizations page. Here, you can find a curated list of organizations that offer essential services and support. Each entry provides detailed information about the organization, including their mission, contact details, and a link to their website. Click on each organization to learn more about the vital support they offer and how you can connect with them.</h6>
      <br />
      <Divider sx={{ backgroundColor: 'black' }} />
      <br /><br />
      <AccordionUsage />
    </div>
  );
}
