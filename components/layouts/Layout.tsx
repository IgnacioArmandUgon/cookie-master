import Head from 'next/head';
import React, { FC } from 'react';
import Navbar from '../ui/Navbar';

const Layout: FC = ({ children }) => {
  return (
    <>
      {/* <Head></Head> */}
      <nav>
        <Navbar />
      </nav>
      <main style={{ padding: '20px 50px' }}>{children}</main>
    </>
  );
};

export default Layout;
