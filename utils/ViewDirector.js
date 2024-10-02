import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/drawers/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, loading } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();

  // Handle admin button click to show the sign-in dialog
  const handleAdminClick = () => {
    if (!user) {
      setShowSignIn(true);
    } else {
      router.push('/admin/dashboard');
    }
  };

  // Callback to handle successful login
  const handleSignInSuccess = () => {
    setShowSignIn(false);
    window.location.reload();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar onAdminClick={handleAdminClick} /> {/* Pass the admin click handler */}
      {showSignIn && <Signin onSuccess={handleSignInSuccess} />} {/* Show sign-in dialog conditionally */}
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
    loading: PropTypes.bool,
  }).isRequired,
};

export default ViewDirectorBasedOnUserAuthStatus;
