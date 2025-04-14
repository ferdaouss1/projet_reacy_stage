// src/App.js
import Table from './Table.jsx'
import Table2 from './Table2.jsx'
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Bienvenue sur notre plateforme de voyage ✈
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Explorez les meilleures offres de voyages et de produits liés au tourisme. Réservez maintenant et commencez votre aventure !
      </p>
      <Table />
        <h2>TP2</h2>
      <Table2 />
    
    </div>
  );
}

export default App;