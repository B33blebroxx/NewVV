import { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ExternalLinksProvider } from '../utils/context/externalLinksContext';

function MyApp({ Component, pageProps }) {
  const memoizedViewDirector = useMemo(() => (
    <ViewDirectorBasedOnUserAuthStatus
      component={Component}
      pageProps={pageProps}
    />
  ), [Component, pageProps]);

  return (
    <ErrorBoundary fallback={<div>Sorry, something went wrong.</div>}>
      <ExternalLinksProvider>
        <AuthProvider>
          {memoizedViewDirector}
        </AuthProvider>
      </ExternalLinksProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
