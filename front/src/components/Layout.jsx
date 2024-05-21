import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
