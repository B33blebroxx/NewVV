import React, {
  createContext, useState, useContext, useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { getExternalLinks } from '../../api/externalLinkApi';

const ExternalLinksContext = createContext();

export function ExternalLinksProvider({ children }) {
  const [externalLinks, setExternalLinks] = useState([]);

  const refreshExternalLinks = useCallback(async () => {
    try {
      const links = await getExternalLinks();
      setExternalLinks(links);
    } catch (error) {
      console.error('Failed to fetch external links:', error);
      setExternalLinks([]);
    }
  }, []);

  const contextValue = useMemo(() => ({ externalLinks, refreshExternalLinks }), [externalLinks, refreshExternalLinks]);

  return (
    <ExternalLinksContext.Provider value={contextValue}>
      {children}
    </ExternalLinksContext.Provider>
  );
}

export function useExternalLinks() {
  return useContext(ExternalLinksContext);
}

ExternalLinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
