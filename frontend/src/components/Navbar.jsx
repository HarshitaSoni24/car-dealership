import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, LogOut, User as UserIcon, Shield } from 'lucide-react';

export default function Navbar({ onOpenAuth, onOpenAddModal, currentView, setView }) {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setView('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="p-2 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-200/50 group-hover:scale-110 transition-transform">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">Apex Motors</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wider">
              Inventory OS
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setView('showroom')}
            className={`text-sm font-bold transition-colors ${currentView === 'showroom' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Showroom
          </button>
          {user && !isAdmin && (
            <button 
              onClick={() => setView('my-garage')}
              className={`text-sm font-bold transition-colors ${currentView === 'my-garage' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              My Garage
            </button>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <button
                  onClick={onOpenAddModal}
                  className="px-3.5 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition shadow-md shadow-indigo-100 flex items-center gap-1.5"
                >
                  <Shield className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">{user.username}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 uppercase font-bold">
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 hover:bg-slate-100 text-slate-400 hover:text-rose-500 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition shadow-md shadow-indigo-100"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}