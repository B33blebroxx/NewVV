import React from 'react';
import { Card } from 'react-bootstrap';
import Image from 'next/image';
import logo from '../utils/data/ValVenisLogo.png';

function Home() {
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
          <h5>Our mission is to create a safe, inclusive, and supportive online space for LGBTQIA+ individuals. We aim to connect those in need with essential resources, information, and communities that uplift and empower them. Our goal is to ensure that every person can access the support they need to thrive, celebrate their identity, and build a fulfilling life.</h5>
        </Card>
      </div>
    </div>
  );
}

export default Home;
