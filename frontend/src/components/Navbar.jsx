import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, LogOut, User as UserIcon, Shield } from 'lucide-react';

export default function Navbar({ onOpenAuth, onOpenAddModal }) {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight">Apex Motors</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
              Inventory OS
            </span>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <button
                  onClick={onOpenAddModal}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                >
                  <Shield className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-200">{user.username}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 uppercase font-semibold">
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/20"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}