import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ sidebarOpen, setSidebarOpen, children }) => {
  return (
    <div className="app-layout">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="main-section">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;