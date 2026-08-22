import React from 'react';
import { ArrowRight, Car, Shield, Sparkles, ChevronRight } from 'lucide-react';

export default function LandingPage({ onExplore, onManage }) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pastel Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px] opacity-60 -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px] opacity-50 -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Future of Inventory
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Refined. Simple. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
            Transparently Luxury.
          </span>
        </h1>
        
        <p className="text-lg lg:text-xl text-slate-500 max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Experience the most intuitive way to explore, purchase, and manage premium vehicle collections. Built for drivers and partners alike.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <button
            onClick={onExplore}
            className="group px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
          >
            Explore Showroom
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onManage}
            className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg transition-all active:scale-95"
          >
            Partner Access
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Premium Selection</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Curated fleet of the world's most sought-after vehicles, from electric innovators to classic icons.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Instant Purchase</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              A frictionless buying experience designed for the digital age. Real-time availability and transparent pricing.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Partner Tools</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Powerful inventory management for dealership partners. Real-time restock, sales tracking, and fleet control.
            </p>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-slate-900 rounded-[40px] p-8 lg:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -z-0" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to find your next drive?</h2>
            <button
              onClick={onExplore}
              className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-indigo-50 transition-colors flex items-center gap-2 mx-auto shadow-lg"
            >
              Start Browsing
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm font-medium">
        © 2026 Apex Motors Luxury Group. All rights reserved.
      </footer>
    </div>
  );
}