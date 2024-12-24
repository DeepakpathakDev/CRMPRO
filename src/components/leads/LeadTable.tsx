import React, { useState } from 'react';
import { UserPlus, UserMinus, Edit, Trash2, Phone, MessageCircle } from 'lucide-react';
import { Lead } from '../../types';
import AssignLeadModal from './AssignLeadModal';
import FollowUpForm from './FollowUpForm';
import FollowUpHistory from './FollowUpHistory';
import CallTimer from './CallTimer';

interface LeadTableProps {
  leads: Lead[];
  onAssign: (leadId: string, employeeId: string) => void;
  onUnassign: (leadId: string) => void;
  onFollowUp: (leadId: string, followUpData: any) => void;
  onCallEnd: (leadId: string, duration: number) => void;
}

export default function LeadTable({ leads, onAssign, onUnassign, onFollowUp, onCallEnd }: LeadTableProps) {
  const [assigningLead, setAssigningLead] = useState<string | null>(null);
  const [followUpLead, setFollowUpLead] = useState<string | null>(null);
  const [viewingHistory, setViewingHistory] = useState<string | null>(null);

  const handleWhatsAppClick = (mobile: string) => {
    const formattedNumber = mobile.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  };

  const getLeadById = (id: string) => leads.find(lead => lead.id === id);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['S.No', 'Employee', 'Lead Source', 'Mobile', 'Company Name', 'Person', 
                'Email', 'Lead Type', 'Address', 'Remark', 'Date', 'Time', 
                'Call Duration', 'Status', 'Actions'].map((header) => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead, index) => (
              <tr 
                key={lead.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setViewingHistory(lead.id)}
              >
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{lead.employee}</td>
                <td className="px-4 py-3 text-sm">{lead.leadSource}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center space-x-2">
                    {lead.mobile}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppClick(lead.mobile);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{lead.companyName}</td>
                <td className="px-4 py-3 text-sm">{lead.person}</td>
                <td className="px-4 py-3 text-sm">{lead.email}</td>
                <td className="px-4 py-3 text-sm">{lead.leadType}</td>
                <td className="px-4 py-3 text-sm">{lead.address}</td>
                <td className="px-4 py-3 text-sm">{lead.remark}</td>
                <td className="px-4 py-3 text-sm">{lead.date}</td>
                <td className="px-4 py-3 text-sm">{lead.time}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center space-x-2">
                    {lead.callDuration}
                    <CallTimer 
                      onCallEnd={(duration) => {
                        onCallEnd(lead.id, duration);
                      }} 
                    />
                  </div>
                </td>
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
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setFollowUpLead(lead.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Add Follow Up"
                    >
                      <Edit size={16} />
                    </button>
                    {lead.assignedTo ? (
                      <button
                        onClick={() => onUnassign(lead.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Unassign Lead"
                      >
                        <UserMinus size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setAssigningLead(lead.id)}
                        className="text-green-600 hover:text-green-800"
                        title="Assign Lead"
                      >
                        <UserPlus size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssignLeadModal
        isOpen={!!assigningLead}
        onClose={() => setAssigningLead(null)}
        onAssign={(employeeId) => {
          if (assigningLead) {
            onAssign(assigningLead, employeeId);
            setAssigningLead(null);
          }
        }}
      />

      <FollowUpForm
        isOpen={!!followUpLead}
        onClose={() => setFollowUpLead(null)}
        onSubmit={(data) => {
          if (followUpLead) {
            onFollowUp(followUpLead, data);
            setFollowUpLead(null);
          }
        }}
        leadId={followUpLead || ''}
      />

      {viewingHistory && (
        <FollowUpHistory
          isOpen={true}
          onClose={() => setViewingHistory(null)}
          followUps={getLeadById(viewingHistory)?.followUps || []}
        />
      )}
    </>
  );
}