import React, { useEffect, useState } from 'react';

const VenteSelects = () => {
  const [zones, setZones] = useState([]);
  const [lots, setLots] = useState([]);
  const [niveaux, setNiveaux] = useState([]);

  fetch('https://demo9780723.mockable.io/vente')
  .then(response => response.json())
  .then(data => {
    console.log("Data from API:", data); // باش تشوفي الـ structure ديالها
    if (Array.isArray(data)) {
      const uniqueZones = [...new Set(data.map(item => item.zone))];
      const uniqueLots = [...new Set(data.map(item => item.lot))];
      const uniqueNiveaux = [...new Set(data.map(item => item.niveau))];

      setZones(uniqueZones);
      setLots(uniqueLots);
      setNiveaux(uniqueNiveaux);
    } else {
      console.error("Format inattendu des données:", data);
    }
  })
  .catch(error => {
    console.error("Erreur lors du chargement des données:", error);
  });


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-700 text-center">Filtrer les ventes</h2>

      <div>
        <label className="block mb-2 text-gray-600 font-medium">Zone</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          {zones.map((zone, index) => (
            <option key={index} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-gray-600 font-medium">Lot</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          {lots.map((lot, index) => (
            <option key={index} value={lot}>{lot}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-gray-600 font-medium">Niveau</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          {niveaux.map((niveau, index) => (
            <option key={index} value={niveau}>{niveau}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VenteSelects;
