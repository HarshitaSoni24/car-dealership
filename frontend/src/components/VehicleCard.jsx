import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Edit, Trash2, PlusCircle, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { savedVehicleApi } from '../api/client';

export default function VehicleCard({ vehicle, onPurchase, onRestock, onEdit, onDelete }) {
  const { user, isAdmin, savedVehicles, fetchSavedVehicles } = useAuth();
  const [purchasing, setPurchasing] = useState(false);
  const [restockAmount, setRestockAmount] = useState('');
  const [showRestock, setShowRestock] = useState(false);

  const isOutOfStock = vehicle.quantity <= 0;
  const isSaved = savedVehicles.includes(vehicle.id);

  const handleToggleSave = async () => {
    if (!user) {
      alert('Please log in to save vehicles.');
      return;
    }
    try {
      if (isSaved) {
        await savedVehicleApi.unsave(vehicle.id);
      } else {
        await savedVehicleApi.save(vehicle.id);
      }
      await fetchSavedVehicles();
    } catch (err) {
      alert('Failed to update saved vehicles.');
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      alert('Please log in to purchase vehicles.');
      return;
    }
    setPurchasing(true);
    await onPurchase(vehicle.id);
    setPurchasing(false);
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(restockAmount, 10);
    if (amount > 0) {
      onRestock(vehicle.id, amount);
      setRestockAmount('');
      setShowRestock(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-slate-200 transition-all duration-300 flex flex-col
       justify-between group shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-slate-300/40">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
              {vehicle.category}
            </span>
            {user && (
              <button onClick={handleToggleSave} className={`transition-colors ${isSaved ? 'text-rose-500' : 'text-slate-300 hover:text-rose-400'}`}>
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
              </button>
            )}
          </div>
          {isOutOfStock ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-rose-50 text-rose-600 border border-rose-100 flex
       items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Sold Out
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 border
       border-emerald-100 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {vehicle.quantity} In Stock
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-500 transition-colors">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-2xl font-black text-slate-900 mt-2">
          ${vehicle.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="p-5 pt-0 mt-auto">
        <div className="border-t border-slate-50 pt-4 flex flex-col gap-2">
          <button
            onClick={handlePurchase}
            disabled={isOutOfStock || purchasing}
            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              isOutOfStock
                ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-100 active:scale-[0.98]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {purchasing ? 'Processing...' : isOutOfStock ? 'Currently Unavailable' : 'Purchase Now'}
          </button>
          {isAdmin && (
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setShowRestock(!showRestock)}
                title="Restock"
                className="flex-1 py-2 px-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition flex items-center
       justify-center gap-1.5 border border-slate-100"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Restock
              </button>
              <button
                onClick={() => onEdit(vehicle)}
                title="Edit details"
                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-500 rounded-lg transition border border-slate-100"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(vehicle.id)}
                title="Delete vehicle"
                className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition border border-slate-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
          {isAdmin && showRestock && (
            <form onSubmit={handleRestockSubmit} className="flex gap-2 mt-2 animate-in fade-in slide-in-from-top-1">
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
                className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none
       focus:border-indigo-400"
                required
              />
              <button
                type="submit"
                className="flex-1 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition shadow-sm"
              >
                Confirm
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}