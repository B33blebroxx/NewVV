import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Image } from 'react-bootstrap';

// This component displays a list of organizations and their details/contact info in an accordion format.
export default function OrgAccordion({ organizations }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {organizations.map((org) => (
        <Accordion
          sx={{
            background: 'rgba( 255, 255, 255, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 5.5px )',
            width: '80%',
            alignItems: 'center',
          }}
          className="accordian"
          key={org.id}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${org.id}-content`}
            id={`panel-${org.id}-header`}
            sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
            }}
            className="accordion-summary"
          >
            <Box style={{ width: '100%', textAlign: 'center' }}>
              <h5>
                {org.supportOrgName}
              </h5>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Box>
              <Image src={org.supportOrgLogo} alt={`${org.supportOrgName} logo`} style={{ width: '35%', height: '55%' }} />
            </Box>
            <br />
            <Box>
              <p style={{ maxWidth: '90%', paddingLeft: '10%' }}>{org.supportOrgSummary}</p>
            </Box>
          </AccordionDetails>
          <AccordionActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="text" href={`tel:${org.supportOrgPhone}`}>Phone Support</Button>
            <Button variant="text" href={org.supportOrgUrl} target="_blank" rel="noopener noreferrer">Visit Site</Button>
          </AccordionActions>
        </Accordion>
      ))}
    </Box>
  );
}

// Prop types for the OrgAccordion component.
OrgAccordion.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    supportOrgName: PropTypes.string,
    supportOrgSummary: PropTypes.string,
    supportOrgLogo: PropTypes.string,
    supportOrgPhone: PropTypes.string,
    supportOrgUrl: PropTypes.string,
  })),
};

// Default props for the OrgAccordion component.
OrgAccordion.defaultProps = {
  organizations: [
    {
      id: 1,
      supportOrgName: 'Organization Name',
      supportOrgSummary: 'Organization Summary',
      supportOrgLogo: 'Organization Logo',
      supportOrgPhone: 'Organization Phone',
      supportOrgUrl: 'Organization URL',
    },
  ],
};
