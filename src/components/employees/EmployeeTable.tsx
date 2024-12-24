import React, { useState } from 'react';
import { Edit, Trash2, BarChart } from 'lucide-react';
import { Employee } from '../../types';
import EmployeePerformance from './EmployeePerformance';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface EmployeeTableProps {
  employees: Employee[];
  onDelete?: (id: string) => void;
  leads: any[]; // Add proper type
}

export default function EmployeeTable({ employees, onDelete, leads }: EmployeeTableProps) {
  const [viewingPerformance, setViewingPerformance] = useState<string | null>(null);

  const getEmployeeLeads = (employeeId: string) => {
    return leads.filter(lead => lead.assignedTo === employeeId);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee, index) => (
              <TableRow 
                key={employee.id}
                employee={employee}
                index={index}
                onDelete={onDelete}
                onViewPerformance={() => setViewingPerformance(employee.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {viewingPerformance && (
        <EmployeePerformance
          isOpen={true}
          onClose={() => setViewingPerformance(null)}
          leads={getEmployeeLeads(viewingPerformance)}
          employeeName={employees.find(e => e.id === viewingPerformance)?.name || ''}
        />
      )}
    </>
  );
}