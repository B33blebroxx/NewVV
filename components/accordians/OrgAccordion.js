import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Image } from 'react-bootstrap';
import getOrgs from '../../api/supportOrgApi';

export default function OrgAccordion() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      const orgs = await getOrgs();
      setOrganizations(orgs);
    };
    fetchOrgs();
  }, []);

  return (
    <div>
      {organizations.map((org) => (
        <Accordion
          sx={{
            background: 'rgba( 255, 255, 255, 0.25 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            'backdrop-filter': 'blur( 5.5px )',
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
            <div style={{ width: '100%', textAlign: 'center' }}>
              {org.supportOrgName}
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', textAlign: 'center' }}>
            <div>
              <Image src={org.supportOrgLogo} alt={`${org.supportOrgName} logo`} style={{ width: '35%', height: '55%' }} />
              <p>{org.supportOrgSummary}</p>
            </div>
          </AccordionDetails>
          <AccordionActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="text" href={`tel:${org.supportOrgPhone}`}>Phone Support</Button>
            <Button variant="text" href={org.supportOrgUrl} target="_blank" rel="noopener noreferrer">Visit Site</Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
