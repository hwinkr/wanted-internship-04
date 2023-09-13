import React from 'react';
import GlobalStyle from '../Global/GlobalStyle';

interface GlobalStyleProviderProps {
  children: React.ReactNode;
}

const GlobalStyleProvider = ({ children }: GlobalStyleProviderProps) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default GlobalStyleProvider;
