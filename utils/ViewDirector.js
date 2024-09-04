import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/drawers/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const router = useRouter();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  const handleAdminClick = (e) => {
    e.preventDefault();
    if (!user) {
      setRedirectToAdmin(true);
    } else {
      router.push('/admin');
    }
  };

  if (redirectToAdmin) {
    return <Signin onSuccess={() => router.push('/admin/dashboard')} />;
  }

  return (
    <>
      <NavBar onAdminClick={handleAdminClick} /> {/* NavBar always visible */}
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
