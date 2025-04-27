import React, { useEffect, useState } from 'react';
import { FaFileAlt, FaPen, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';

const Table = () => {
  const [ventes, setVentes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [selectedChantier, setSelectedChantier] = useState('Chantier 1');
  const [showAddChantierForm, setShowAddChantierForm] = useState(false);
  const [newChantier, setNewChantier] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); // Variable to show form
  const [newRow, setNewRow] = useState({}); // To store new row data

  const visibleKeys = [
    "zone", "lot", "niveau", "n° tf", "acheteur", "date", "situation", "superficie",
    "pu d", "pu b", "pu vente", "prix total b", "prix total d", "prix total", "total apr", "statut"
  ];

  useEffect(() => {
    fetch('/vente')
      .then(res => res.json())
      .then(data => setVentes(data.content || data))
      .catch(err => console.error('Erreur loading ventes:', err));
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setShowAddChantierForm(true);
    } else {
      setSelectedChantier(value);
      setShowAddChantierForm(false);
    }
  };

  const handleAddNewChantier = (e) => {
    e.preventDefault();
    if (newChantier.trim()) {
      setSelectedChantier(newChantier);
      setNewChantier('');
      setShowAddChantierForm(false);
    }
  };

  const handleEdit = (idx) => {
    setEditingIndex(idx);
    setEditedRow({ ...ventes[idx] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedRow({});
  };

  const handleSaveEdit = () => {
    const updatedVentes = ventes.map((v, idx) => idx === editingIndex ? editedRow : v);
    setVentes(updatedVentes);
    setEditingIndex(null);
    setEditedRow({});
  };

  const handleChange = (e, key) => {
    setEditedRow(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleDelete = (idx) => {
    setVentes(ventes.filter((_, i) => i !== idx));
  };

  const handleAddRow = () => {
    setVentes([...ventes, newRow]); // Add new row to the table
    setNewRow({});
    setShowAddForm(false);
  };

  const handleNewRowChange = (e, key) => {
    setNewRow(prev => ({ ...prev, [key]: e.target.value }));
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      if (value?.id !== undefined) return value.id;
      if (value?.value !== undefined) return value.value;
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Select Chantier */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <select
          value={selectedChantier}
          onChange={handleSelectChange}
          className="p-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Chantier 1">Chantier 1</option>
          <option value="Depot">Depot</option>
          <option value="add_new">➕ Ajouter un nouveau chantier</option>
        </select>

        {showAddChantierForm && (
          <form onSubmit={handleAddNewChantier} className="flex items-center gap-2">
            <input
              type="text"
              value={newChantier}
              onChange={(e) => setNewChantier(e.target.value)}
              placeholder="Nouveau chantier"
              className="p-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Ajouter
            </button>
          </form>
        )}
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" border="2">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              {visibleKeys.map(key => (
                <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase capitalize">
                  {key}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ajouter</th> {/* Column for Add button */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ventes.map((vente, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 flex space-x-2">
                  {editingIndex === idx ? (
                    <>
                      <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-800" title="Save"><FaCheck /></button>
                      <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-800" title="Cancel"><FaTimes /></button>
                    </>
                  ) : (
                    <>
                      <button title="Fichier" className="text-gray-500 hover:text-gray-700"><FaFileAlt /></button>
                      <button onClick={() => handleEdit(idx)} className="text-indigo-600 hover:text-indigo-800" title="Modifier"><FaPen /></button>
                      <button onClick={() => handleDelete(idx)} className="text-red-600 hover:text-red-800" title="Supprimer"><FaTrash /></button>
                    </>
                  )}
                </td>

                {visibleKeys.map(key => (
                  <td key={key} className="px-4 py-2 text-sm text-gray-700">
                    {editingIndex === idx ? (
                      <input
                        type={key === 'date' ? 'date' : 'text'}
                        value={editedRow[key] || ''}
                        onChange={(e) => handleChange(e, key)}
                        className="border border-gray-300 rounded p-1 w-full"
                      />
                    ) : (
                      key === 'date'
                        ? (vente[key] ? new Date(vente[key]).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }) : '')
                        : renderValue(vente[key])
                    )}
                  </td>
                ))}

                <td className="px-4 py-2 text-sm text-gray-700">
                  <button onClick={() => setShowAddForm(true)} className="text-green-600 hover:text-green-800" title="Ajouter une nouvelle ligne">
                    <FaPlus /> {/* Adding Plus Icon in Actions column */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Row Form */}
      {showAddForm && (
        <div className="max-w-6xl mx-auto mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium mb-4">Ajouter une nouvelle ligne</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddRow(); }}>
            {visibleKeys.map(key => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">{key}</label>
                <input
                  type="text"
                  value={newRow[key] || ''}
                  onChange={(e) => handleNewRowChange(e, key)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
              </div>
            ))}
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ajouter</button>
            <button onClick={() => setShowAddForm(false)} type="button" className="px-4 py-2 bg-red-600 text-white rounded ml-2 hover:bg-red-700">Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Table;
