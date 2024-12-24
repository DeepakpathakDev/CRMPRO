import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AssignLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (employeeId: string) => void;
}

export default function AssignLeadModal({ isOpen, onClose, onAssign }: AssignLeadModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign Lead</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Employee
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select an employee</option>
            {/* Add employee options */}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedEmployee) {
                onAssign(selectedEmployee);
                setSelectedEmployee('');
              }
            }}
            disabled={!selectedEmployee}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}