import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@mui/material';
import getOrgs from '../../api/supportOrgApi';
import OrgAccordion from '../../components/accordians/OrgAccordion';
import { getSupportPageData } from '../../api/supportPageApi';

export default function SupportOrganizationsPage() {
  const [pageData, setPageData] = useState({});
  const [organizations, setOrganizations] = useState([]);

  const fetchOrgs = async () => {
    getOrgs().then(setOrganizations);
  };

  const fetchPageData = async () => {
    getSupportPageData().then(setPageData);
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  useEffect(() => {
    fetchPageData();
  }, []);

  return (
    <Box>
      <br /><br />
      <h1 style={{ textAlign: 'center' }}>{pageData.supportPageHeader}</h1>
      <br />
      <h4 style={{ textAlign: 'center' }}>{pageData.supportPageIntro}</h4>
      <br />
      <Divider sx={{ backgroundColor: 'black' }} />
      <br /><br />
      <OrgAccordion organizations={organizations} />
    </Box>
  );
}

SupportOrganizationsPage.propTypes = {
  pageData: PropTypes.shape({
    supportPageHeader: PropTypes.string.isRequired,
    supportPageIntro: PropTypes.string.isRequired,
  }).isRequired,
};
