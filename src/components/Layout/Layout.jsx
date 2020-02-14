import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className='app'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
