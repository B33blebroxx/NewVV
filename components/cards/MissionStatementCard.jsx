import { Card } from '@mui/material';
import PropTypes from 'prop-types';

export default function MissionStatement({ missionStatement }) {
  return (
    <Card id="mission-statement-card">
      <h1>{missionStatement.welcomeMessage}</h1>
      <br />
      <h5>
        {missionStatement.missionStatementText}
      </h5>
      <br />
      <br />
      <h6>
        {missionStatement.missionStatementAcronym}
      </h6>
    </Card>
  );
}

MissionStatement.propTypes = {
  missionStatement: PropTypes.shape({
    missionStatementText: PropTypes.string,
    missionStatementAcronym: PropTypes.string,
    welcomeMessage: PropTypes.string,
  }).isRequired,
};
