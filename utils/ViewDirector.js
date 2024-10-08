import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import NavBar from '../components/drawers/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Handle admin button click
  const handleAdminClick = () => {
    if (user) {
      router.push('/admin/dashboard');
    }
    // If user is not logged in, the NavBar will handle showing the SignInDialog
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar onAdminClick={handleAdminClick} />
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
