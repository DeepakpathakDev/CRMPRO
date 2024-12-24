import React from 'react';
import { X } from 'lucide-react';
import { FollowUp } from '../../types';

interface FollowUpHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  followUps: FollowUp[];
}

export default function FollowUpHistory({ isOpen, onClose, followUps }: FollowUpHistoryProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      successful: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      hold: 'bg-blue-100 text-blue-800',
      'not-interested': 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Follow Up History</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {followUps.map((followUp) => (
            <div key={followUp.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(followUp.status)}`}>
                    {followUp.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(followUp.date).toLocaleDateString()} {followUp.time}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Next Follow Up: {new Date(followUp.nextFollowUpDate).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{followUp.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}