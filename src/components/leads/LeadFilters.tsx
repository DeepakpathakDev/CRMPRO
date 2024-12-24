import React from 'react';
import { X } from 'lucide-react';

interface LeadFiltersProps {
  filters: {
    dateRange: { start: string; end: string };
    employee: string;
    leadSource: string;
    leadType: string;
  };
  onFilterChange: (filters: any) => void;
  onClose: () => void;
}

export default function LeadFilters({ filters, onFilterChange, onClose }: LeadFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Advanced Filters</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.dateRange.start}
            onChange={(e) => onFilterChange({
              ...filters,
              dateRange: { ...filters.dateRange, start: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.dateRange.end}
            onChange={(e) => onFilterChange({
              ...filters,
              dateRange: { ...filters.dateRange, end: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Employee</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.employee}
            onChange={(e) => onFilterChange({ ...filters, employee: e.target.value })}
          >
            <option value="">All Employees</option>
            {/* Add employee options */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lead Source</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.leadSource}
            onChange={(e) => onFilterChange({ ...filters, leadSource: e.target.value })}
          >
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="social">Social Media</option>
          </select>
        </div>
      </div>
    </div>
  );
}