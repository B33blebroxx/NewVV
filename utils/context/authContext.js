import React, {
  createContext, useContext, useEffect, useMemo, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  checkUser, signIn, signOut, registerUser,
} from '../auth';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignIn = useCallback(async (username, password) => {
    try {
      const userData = await signIn(username, password);
      setUser(userData);
    } catch (error) {
      console.error('Sign-in failed:', error.message);
      setUser(null);
      throw error; // Re-throw the error so it can be handled by the component
    }
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
    setUser(null);
  }, []);

  const handleRegister = useCallback(async (userInfo) => {
    try {
      await registerUser(userInfo);
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error; // Re-throw the error so it can be handled by the component
    }
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await checkUser();
        setUser(result.isLoggedIn ? result.user : null);
      } catch (error) {
        console.error('Error verifying user:', error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn: handleSignIn,
      signOut: handleSignOut,
      register: handleRegister,
    }),
    [user, loading, handleSignIn, handleSignOut, handleRegister],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
