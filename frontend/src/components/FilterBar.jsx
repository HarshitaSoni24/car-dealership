import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function FilterBar({ filters, setFilters, onSearch, onReset }) {
  const categories = ['All', 'Sedan', 'SUV', 'Truck', 'Coupe', 'Electric', 'Wagon'];

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCategoryClick = (category) => {
    setFilters({ ...filters, category: category === 'All' ? '' : category });
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
      >
        {/* Make Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            name="make"
            placeholder="Search make (e.g. Toyota)..."
            value={filters.make}
            onChange={handleChange}
            className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Model Search */}
        <div className="relative">
          <input
            type="text"
            name="model"
            placeholder="Model (e.g. Camry)..."
            value={filters.model}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Min Price */}
        <div>
          <input
            type="number"
            name="min_price"
            placeholder="Min Price ($)"
            value={filters.min_price}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Max Price */}
        <div>
          <input
            type="number"
            name="max_price"
            placeholder="Max Price ($)"
            value={filters.max_price}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5"
          >
            <Filter className="w-4 h-4" />
            Apply
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Reset Filters"
            className="p-2 bg-slate-700/60 hover:bg-slate-700 text-slate-300 rounded-xl transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-700/40">
        {categories.map((cat) => {
          const isSelected = (cat === 'All' && !filters.category) || filters.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}