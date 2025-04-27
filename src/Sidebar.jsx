import React from 'react';
import { Link } from 'react-router-dom';  // إضافة Link من React Router
import './Sidebar.css';

const Sidebar = ({ sidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      <div className="sidebar__logo">
        <img src="/logo.png" alt="Logo" />
        <h1>Berrahal West</h1>
      </div>

      <div className="sidebar__user">
        <i className="fas fa-user-circle"></i>
        <span>Nom d'utilisateur</span>
      </div>

      <ul className="sidebar__menu">
        <li>
          <Link to="/"> 
            <i className="fas fa-home"></i> Dashboard
          </Link>
        </li>

        <li className="sidebar__submenu">
          <i className="fas fa-shopping-cart"></i> Vente
          <ul className="sidebar__submenu-list">
            <li>
              <Link to="/vente">Vente</Link>
            </li>
            <li>
              <Link to="/avance-detail">Avance Détail</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/achat">
            <i className="fas fa-shopping-bag"></i> Achat
          </Link>
        </li>
        <li>
          <Link to="/livre-de-caisse">
            <i className="fas fa-book"></i> Livre de Caisse
          </Link>
        </li>
        <li>
          <Link to="/stock">
            <i className="fas fa-box"></i> Stock
          </Link>
        </li>
        <li>
          <Link to="/taxe">
            <i className="fas fa-percentage"></i> Taxe
          </Link>
        </li>
        <li>
          <Link to="/pre-ouvrier">
            <i className="fas fa-user-friends"></i> Pré Ouvrier
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
