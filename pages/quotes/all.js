import { Box, Divider } from '@mui/material';
import React, { useState } from 'react';
import QuoteCard from '../../components/cards/QuoteCards';
import getQuotes from '../../api/quoteApi';

export default function QuotePage() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    getQuotes().then(setQuotes);
  };

  useState(() => {
    fetchQuotes();
  });

  return (
    <Box>
      <Box>
        <br /><br />
        <h1 style={{ textAlign: 'center' }}>Quotes</h1>
        <br />
        <h4 style={{ textAlign: 'center' }}>Here are some quotes that inspire us.</h4>
        <br />
        <Divider sx={{ backgroundColor: 'black' }} />
        <br /><br />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </Box>
    </Box>
  );
}
