import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import VehicleCard from './components/VehicleCard';
import AuthModal from './components/AuthModal';
import VehicleModal from './components/VehicleModal';
import { vehicleApi } from './api/client';
import { Car } from 'lucide-react';

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ make: '', model: '', category: '', min_price: '', max_price: '' });
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);

  const fetchVehicles = async (activeFilters = filters) => {
    setLoading(true);
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(activeFilters).filter(([_, v]) => v !== '' && v !== null)
      );
      const res = Object.keys(cleanParams).length > 0 
        ? await vehicleApi.search(cleanParams) 
        : await vehicleApi.getAll();
      setVehicles(res.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [filters.category]);

  const handlePurchase = async (id) => {
    try {
      const res = await vehicleApi.purchase(id);
      setVehicles(vehicles.map((v) => (v.id === id ? res.data : v)));
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to purchase vehicle.');
    }
  };

  const handleRestock = async (id, amount) => {
    try {
      const res = await vehicleApi.restock(id, amount);
      setVehicles(vehicles.map((v) => (v.id === id ? res.data : v)));
    } catch (err) {
      alert(err.response?.data?.detail || 'Restock failed.');
    }
  };

  const handleSaveVehicle = async (data) => {
    try {
      if (vehicleToEdit) {
        const res = await vehicleApi.update(vehicleToEdit.id, data);
        setVehicles(vehicles.map((v) => (v.id === vehicleToEdit.id ? res.data : v)));
      } else {
        const res = await vehicleApi.create(data);
        setVehicles([...vehicles, res.data]);
      }
      setIsVehicleModalOpen(false);
      setVehicleToEdit(null);
    } catch (err) {
      alert(err.response?.data?.detail || 'Operation failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this vehicle?')) return;
    try {
      await vehicleApi.delete(id);
      setVehicles(vehicles.filter((v) => v.id !== id));
    } catch (err) {
      alert(err.response?.data?.detail || 'Delete failed.');
    }
  };

  const handleResetFilters = () => {
    const emptyFilters = { make: '', model: '', category: '', min_price: '', max_price: '' };
    setFilters(emptyFilters);
    fetchVehicles(emptyFilters);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAddModal={() => {
          setVehicleToEdit(null);
          setIsVehicleModalOpen(true);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onSearch={() => fetchVehicles(filters)}
          onReset={handleResetFilters}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-400 text-sm">
            Loading inventory...
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 rounded-3xl border border-slate-800">
            <Car className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">No vehicles found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search criteria or add new inventory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onPurchase={handlePurchase}
                onRestock={handleRestock}
                onEdit={(v) => {
                  setVehicleToEdit(v);
                  setIsVehicleModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSave={handleSaveVehicle}
        vehicleToEdit={vehicleToEdit}
      />
    </div>
  );
}