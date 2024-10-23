/* eslint-disable react/require-default-props */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@mui/material';
import { getSupportPageData } from '../../api/supportPageApi';
import { getOrgs } from '../../api/supportOrgApi';
import OrgAccordion from '../../components/accordions/OrgAccordion';

export default function SupportOrganizationsPage({
  pageData: {
    supportPageHeader = 'Support Organizations',
    supportPageIntro = 'Find support organizations here',
  } = {},
}) {
  const [state, setState] = useState({
    pageData: {},
    organizations: [],
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const [orgs, data] = await Promise.all([getOrgs(), getSupportPageData()]);
      setState({
        pageData: data, organizations: orgs, loading: false, error: null,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setState((prevState) => ({ ...prevState, loading: false, error: 'Failed to load data' }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <Box>
      <br /><br />
      <h1 style={{ textAlign: 'center' }}>{state.pageData.supportPageHeader || supportPageHeader}</h1>
      <br />
      <h4 style={{ textAlign: 'center' }}>{state.pageData.supportPageIntro || supportPageIntro}</h4>
      <br />
      <Divider sx={{ backgroundColor: 'black' }} />
      <br /><br />
      <OrgAccordion organizations={state.organizations} />
    </Box>
  );
}

SupportOrganizationsPage.propTypes = {
  pageData: PropTypes.shape({
    supportPageHeader: PropTypes.string,
    supportPageIntro: PropTypes.string,
  }),
};
