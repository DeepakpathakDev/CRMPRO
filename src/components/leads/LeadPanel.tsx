import React, { useState } from 'react';
import { Plus, FileDown, FileUp, Filter } from 'lucide-react';
import LeadTable from './LeadTable';
import LeadFilters from './LeadFilters';
import { downloadTemplate, exportLeads } from '../../utils/exportUtils';
import { Lead, FollowUp } from '../../types';

export default function LeadPanel() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    employee: '',
    leadSource: '',
    leadType: '',
  });

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CSV import
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // Parse CSV and update leads
        const parsedLeads = text.split('\n').slice(1).map(row => {
          const [employee, leadSource, mobile, companyName, person, email, leadType, address, remark, date, time] = row.split(',');
          return {
            id: crypto.randomUUID(),
            employee, leadSource, mobile, companyName, person, email, leadType, 
            address, remark, date, time,
            callDuration: '0:00',
            assignedTo: null,
            status: 'pending' as const,
            followUps: []
          };
        });
        setLeads([...leads, ...parsedLeads]);
      };
      reader.readAsText(file);
    }
  };

  const handleFollowUp = (leadId: string, followUpData: Omit<FollowUp, 'id'>) => {
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: followUpData.status,
          followUps: [...(lead.followUps || []), { ...followUpData, id: crypto.randomUUID() }]
        };
      }
      return lead;
    }));
  };

  const handleCallEnd = (leadId: string, duration: number) => {
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return {
          ...lead,
          callDuration: `${minutes}:${seconds.toString().padStart(2, '0')}`
        };
      }
      return lead;
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
          <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer">
            <FileUp size={20} />
            <span>Import</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleImport} />
          </label>
          <button
            onClick={() => exportLeads(leads)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FileDown size={20} />
            <span>Export</span>
          </button>
          <button
            onClick={downloadTemplate}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FileDown size={20} />
            <span>Template</span>
          </button>
        </div>
      </div>

      {isFiltersOpen && (
        <LeadFilters
          filters={filters}
          onFilterChange={setFilters}
          onClose={() => setIsFiltersOpen(false)}
        />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <LeadTable
          leads={leads}
          onAssign={(leadId, employeeId) => {
            setLeads(leads.map(lead =>
              lead.id === leadId ? { ...lead, assignedTo: employeeId } : lead
            ));
          }}
          onUnassign={(leadId) => {
            setLeads(leads.map(lead =>
              lead.id === leadId ? { ...lead, assignedTo: null } : lead
            ));
          }}
          onFollowUp={handleFollowUp}
          onCallEnd={handleCallEnd}
        />
      </div>
    </div>
  );
}