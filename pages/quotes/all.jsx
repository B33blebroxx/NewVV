import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@mui/material';
import { getQuotePageInfo } from '../../api/quotePageApi';
import { getQuotes } from '../../api/quoteApi';
import QuoteCard from '../../components/cards/QuoteCards';

export default function QuotePage() {
  const [state, setState] = useState({
    quotes: [],
    quotePage: {},
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const [quotes, quotePageInfo] = await Promise.all([getQuotes(), getQuotePageInfo()]);
      setState({
        quotes, quotePage: quotePageInfo, loading: false, error: null,
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
      <Box>
        <br /><br />
        <h1 style={{ textAlign: 'center' }}>{state.quotePage.quotePageHeader || 'Quotes'}</h1>
        <br />
        <h4 style={{ textAlign: 'center' }}>{state.quotePage.quotePageIntro || 'Find quotes here'}</h4>
        <br />
        <Divider sx={{ backgroundColor: 'black' }} />
        <br /><br />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {state.quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </Box>
    </Box>
  );
}

QuotePage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  quotePage: PropTypes.shape({
    quotePageHeader: PropTypes.string,
    quotePageIntro: PropTypes.string,
  }),
};
