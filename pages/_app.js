import { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ExternalLinksProvider } from '../utils/context/externalLinksContext';

// Add type checking without TypeScript

function MyApp({ Component, pageProps }) {
  // Use React 18's automatic batching
  const memoizedViewDirector = useMemo(() => (
    <ViewDirectorBasedOnUserAuthStatus
      component={Component}
      pageProps={pageProps}
    />
  ), [Component, pageProps]);

  return (
    <ErrorBoundary
      fallback={<div>Sorry, something went wrong.</div>}
      onError={(error, errorInfo) => {
        // Add error logging if needed
        console.error('Error:', error, errorInfo);
      }}
    >
      <ExternalLinksProvider>
        <AuthProvider>
          {memoizedViewDirector}
        </AuthProvider>
      </ExternalLinksProvider>
    </ErrorBoundary>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MyApp;
