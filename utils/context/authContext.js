// authContext.js
import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  checkUser, signIn, signOut, registerUser,
} from '../auth';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignIn = async (username, password) => {
    try {
      const userData = await signIn(username, password);
      setUser(userData);
    } catch (error) {
      console.error('Sign-in failed:', error.message);
      setUser(null);
    }
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  const handleRegister = async (userInfo) => {
    try {
      await registerUser(userInfo);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await checkUser();

        if (result && result.isLoggedIn) {
          setUser(result.user);
        } else {
          setUser(null);
        }
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
    [user, loading],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
