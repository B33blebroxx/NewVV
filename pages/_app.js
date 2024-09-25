import { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const memoizedViewDirector = useMemo(() => (
    <ViewDirectorBasedOnUserAuthStatus
      component={Component}
      pageProps={pageProps}
    />
  ), [Component, pageProps]);

  return (
    <ErrorBoundary fallback={<div>Sorry, something went wrong.</div>}>
      <AuthProvider>
        {memoizedViewDirector}
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
