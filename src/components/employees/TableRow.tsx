import React from 'react';
import { Edit, Trash2, BarChart } from 'lucide-react';
import { Employee } from '../../types';

interface TableRowProps {
  employee: Employee;
  index: number;
  onDelete?: (id: string) => void;
  onViewPerformance: () => void;
}

export function TableRow({ employee, index, onDelete, onViewPerformance }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{index + 1}</td>
      <td className="px-4 py-3 text-sm">{employee.name}</td>
      <td className="px-4 py-3 text-sm">{employee.email}</td>
      <td className="px-4 py-3 text-sm">{employee.phone}</td>
      <td className="px-4 py-3 text-sm">{employee.joinDate}</td>
      <td className="px-4 py-3 text-sm">{employee.type}</td>
      <td className="px-4 py-3 text-sm">{employee.group}</td>
      <td className="px-4 py-3 text-sm">{employee.employeeId}</td>
      <td className="px-4 py-3 text-sm">
        <button
          onClick={onViewPerformance}
          className="text-blue-600 hover:text-blue-800"
          title="View Performance"
        >
          <BarChart size={16} />
        </button>
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit size={16} />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(employee.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}