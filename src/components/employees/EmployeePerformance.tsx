import React from 'react';
import { X } from 'lucide-react';
import { Lead } from '../../types';
import PerformanceMetrics from './PerformanceMetrics';
import RecentLeadsTable from './RecentLeadsTable';

interface EmployeePerformanceProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  employeeName: string;
}

export default function EmployeePerformance({ 
  isOpen, 
  onClose, 
  leads, 
  employeeName 
}: EmployeePerformanceProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Performance: {employeeName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <PerformanceMetrics leads={leads} />
        <RecentLeadsTable leads={leads} />
      </div>
    </div>
  );
}