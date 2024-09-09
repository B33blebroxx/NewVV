import { Box } from '@mui/material';
import AddQuoteDialog from '../../components/dialogs/AddQuoteDialog';

export default function Dashboard() {
  return (
    <Box>
      <Box>
        <h1>Dashboard</h1>
      </Box>
      <Box>
        <AddQuoteDialog />
      </Box>
    </Box>
  );
}
