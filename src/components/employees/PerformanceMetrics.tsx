import React from 'react';
import { Lead } from '../../types';

interface PerformanceMetricsProps {
  leads: Lead[];
}

export default function PerformanceMetrics({ leads }: PerformanceMetricsProps) {
  const metrics = {
    total: leads.length,
    successful: leads.filter(lead => lead.status === 'successful').length,
    failed: leads.filter(lead => lead.status === 'failed').length,
    hold: leads.filter(lead => lead.status === 'hold').length,
    notInterested: leads.filter(lead => lead.status === 'not-interested').length,
  };

  const successRate = metrics.total > 0 
    ? ((metrics.successful / metrics.total) * 100).toFixed(1) 
    : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-blue-700 font-semibold">Total Leads</h3>
        <p className="text-2xl font-bold text-blue-700">{metrics.total}</p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-green-700 font-semibold">Success Rate</h3>
        <p className="text-2xl font-bold text-green-700">{successRate}%</p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-purple-700 font-semibold">Active Leads</h3>
        <p className="text-2xl font-bold text-purple-700">
          {metrics.total - metrics.successful - metrics.failed - metrics.notInterested}
        </p>
      </div>

      <div className="col-span-full grid grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-700 font-semibold">Successful</h3>
          <p className="text-xl font-bold text-green-700">{metrics.successful}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-red-700 font-semibold">Failed</h3>
          <p className="text-xl font-bold text-red-700">{metrics.failed}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-yellow-700 font-semibold">On Hold</h3>
          <p className="text-xl font-bold text-yellow-700">{metrics.hold}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-gray-700 font-semibold">Not Interested</h3>
          <p className="text-xl font-bold text-gray-700">{metrics.notInterested}</p>
        </div>
      </div>
    </div>
  );
}