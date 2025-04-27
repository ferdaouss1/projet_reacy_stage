import React from 'react';
import './Header.css';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="header">
      <button className="menu-btn" onClick={() => setSidebarOpen(prev => !prev)}>
        <i className="fas fa-bars"></i>
      </button>
      <h2>Dashboard</h2>
    </header>
  );
};

export default Header;