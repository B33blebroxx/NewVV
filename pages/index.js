import React from 'react';
import { Card } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import logo from '../utils/data/ValVenisLogo.png';
import MissionStatement from '../components/cards/MissionStatement';

function Home({ missionStatement }) {
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image src={logo} alt="Logo" width={300} height={250} style={{ marginBottom: '20px' }} />
      </div>
      <br />
      <div>
        <Card id="mission-statement-card">
          <h1>Welcome to ValVenis.com!</h1>
          <br />
          <h5>
            <MissionStatement missionStatement={missionStatement} />
          </h5>
        </Card>
      </div>
    </div>
  );
}

export default Home;

Home.propTypes = {
  missionStatement: PropTypes.string,
};

Home.defaultProps = {
  missionStatement: '',
};
