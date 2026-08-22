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
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
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
            placeholder="Search make..."
            value={filters.make}
            onChange={handleChange}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          />
        </div>

        {/* Model Search */}
        <div className="relative">
          <input
            type="text"
            name="model"
            placeholder="Model..."
            value={filters.model}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
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
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
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
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100"
          >
            <Filter className="w-4 h-4" />
            Apply
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Reset Filters"
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl transition border border-slate-200"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">
        {categories.map((cat) => {
          const isSelected = (cat === 'All' && !filters.category) || filters.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isSelected
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-700 hover:bg-slate-200 border border-slate-200/50'
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