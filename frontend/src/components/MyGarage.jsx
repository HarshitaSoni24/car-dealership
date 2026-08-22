import React, { useState, useEffect } from 'react';
import { transactionApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import VehicleCard from './VehicleCard';

export default function MyGarage({ vehicles, onPurchase, onRestock, onEdit, onDelete }) {
  const { savedVehicles } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await transactionApi.getMyPurchases();
        setPurchases(res.data);
      } catch (err) {
        console.error('Failed to fetch purchases', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const savedVehiclesData = vehicles.filter(v => savedVehicles.includes(v.id));

  return (
    <div className="space-y-12">
      {/* Saved Vehicles Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">My Garage</h2>
        {savedVehiclesData.length === 0 ? (
            <div className="text-sm text-slate-500 bg-white p-6 rounded-2xl border border-slate-100">No vehicles saved yet.</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedVehiclesData.map((vehicle) => (
                <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onPurchase={onPurchase}
                    onRestock={onRestock}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                ))}
            </div>
        )}
      </section>

      {/* Purchase History Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Purchase History</h2>
        {loading ? (
            <div className="text-sm text-slate-400">Loading history...</div>
        ) : purchases.length === 0 ? (
            <div className="text-sm text-slate-500 bg-white p-6 rounded-2xl border border-slate-100">No purchases yet.</div>
        ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">Vehicle</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {purchases.map((p) => {
                            const vehicle = vehicles.find(v => v.id === p.vehicle_id);
                            return (
                                <tr key={p.id}>
                                    <td className="px-6 py-4 font-bold text-slate-800">{vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle'}</td>
                                    <td className="px-6 py-4">${p.purchase_price.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-500">{new Date(p.timestamp).toLocaleDateString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )}
      </section>
    </div>
  );
}