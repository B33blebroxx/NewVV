import { Card, CardContent } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function QuoteCard({ quote }) {
  return (
    <Card
      sx={{
        background: 'rgba( 255, 255, 255, 0.25 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 5.5px )',
        webkitBackdropFilter: 'blur( 5.5px )',
      }}
      className="quoteCard"
    >
      <CardContent sx={{ textAlign: 'center' }} id="quoteText">{quote.quoteText}</CardContent>
      <CardContent sx={{ textAlign: 'center' }} id="quoteAuthor">-{quote.quoteAuthor}</CardContent>
    </Card>
  );
}

QuoteCard.propTypes = {
  quote: PropTypes.shape({
    quoteAuthor: PropTypes.string.isRequired,
    quoteText: PropTypes.string.isRequired,
  }).isRequired,
};
