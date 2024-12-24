import React from 'react';
import { Lead } from '../../types';

interface RecentLeadsTableProps {
  leads: Lead[];
}

export default function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Person</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{new Date(lead.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm">{lead.companyName}</td>
                <td className="px-4 py-3 text-sm">{lead.person}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    lead.status === 'successful' ? 'bg-green-100 text-green-800' :
                    lead.status === 'failed' ? 'bg-red-100 text-red-800' :
                    lead.status === 'hold' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}