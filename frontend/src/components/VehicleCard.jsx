import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Edit, Trash2, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function VehicleCard({ vehicle, onPurchase, onRestock, onEdit, onDelete }) {
  const { user, isAdmin } = useAuth();
  const [purchasing, setPurchasing] = useState(false);
  const [restockAmount, setRestockAmount] = useState('');
  const [showRestock, setShowRestock] = useState(false);

  const isOutOfStock = vehicle.quantity <= 0;

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
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden hover:border-slate-600 transition flex flex-col justify-between group">
      <div className="p-5">
        {/* Header Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/50">
            {vehicle.category}
          </span>
          {isOutOfStock ? (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Out of Stock
            </span>
          ) : (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> In Stock: {vehicle.quantity}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-2xl font-extrabold text-white mt-2">
          ${vehicle.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Actions */}
      <div className="p-5 pt-0 mt-auto">
        <div className="border-t border-slate-700/50 pt-4 flex flex-col gap-2">
          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={isOutOfStock || purchasing}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
              isOutOfStock
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {purchasing ? 'Processing...' : isOutOfStock ? 'Sold Out' : 'Purchase'}
          </button>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setShowRestock(!showRestock)}
                title="Restock"
                className="flex-1 py-1.5 px-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Restock
              </button>
              <button
                onClick={() => onEdit(vehicle)}
                title="Edit details"
                className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(vehicle.id)}
                title="Delete vehicle"
                className="p-1.5 bg-slate-700 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Restock Popover / Input */}
          {isAdmin && showRestock && (
            <form onSubmit={handleRestockSubmit} className="flex gap-2 mt-2">
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
                className="w-20 px-2.5 py-1 bg-slate-900 border border-slate-600 rounded-lg text-xs text-white"
                required
              />
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium"
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