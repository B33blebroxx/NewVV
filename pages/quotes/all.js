import { Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import QuoteCard from '../../components/cards/QuoteCards';
import { getQuotePageInfo } from '../../api/quotePageApi';
import { getQuotes } from '../../api/quoteApi';

export default function QuotePage() {
  const [quotes, setQuotes] = useState([]);
  const [quotePage, setQuotePage] = useState({});

  const fetchQuotePageInfo = async () => {
    getQuotePageInfo().then(setQuotePage);
  };

  const fetchQuotes = async () => {
    getQuotes().then(setQuotes);
  };

  useState(() => {
    fetchQuotePageInfo();
    fetchQuotes();
  });

  return (
    <Box>
      <Box>
        <br /><br />
        <h1 style={{ textAlign: 'center' }}>{quotePage.quotePageHeader}</h1>
        <br />
        <h4 style={{ textAlign: 'center' }}>{quotePage.quotePageIntro}</h4>
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

QuotePage.propTypes = {
  quotePage: PropTypes.shape({
    quotePageHeader: PropTypes.string,
    quotePageIntro: PropTypes.string,
  }),
};

QuotePage.defaultProps = {
  quotePage: {
    quotePageHeader: '',
    quotePageIntro: '',
  },
};
