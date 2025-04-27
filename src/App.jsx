import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Vente from './pages/Vente';
import AvanceDetail from './pages/AvanceDetail';
import Achat from './pages/Achat';
import LivreDeCaisse from './pages/LivreDeCaisse';
import Stock from './pages/Stock';

import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vente" element={<Vente />} />
            <Route path="/avance-detail" element={<AvanceDetail />} />
            <Route path="/achat" element={<Achat />} />
            <Route path="/livre-de-caisse" element={<LivreDeCaisse />} />
            <Route path="/stock" element={<Stock />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
