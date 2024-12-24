import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { Employee, Lead } from '../../types';

export default function EmployeePanel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]); // This would come from your backend

  const handleSubmit = (data: Omit<Employee, 'id'>) => {
    setEmployees([...employees, { ...data, id: crypto.randomUUID() }]);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const filteredEmployees = employees.filter(employee => 
    Object.values(employee).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <p className="text-gray-600">Total Employees: {employees.length}</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <EmployeeTable 
          employees={filteredEmployees} 
          onDelete={handleDelete}
          leads={leads}
        />
      </div>

      <EmployeeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}