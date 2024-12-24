import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import SalesTable from './SalesTable';
import SalesOrderForm from './SalesOrderForm';
import { SaleOrder } from '../../types';

export default function SalesPanel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sales, setSales] = useState<SaleOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSale, setEditingSale] = useState<SaleOrder | undefined>();

  const handleSubmit = (data: Omit<SaleOrder, 'id'>) => {
    if (editingSale) {
      setSales(sales.map(sale => 
        sale.id === editingSale.id 
          ? { ...data, id: editingSale.id }
          : sale
      ));
      setEditingSale(undefined);
    } else {
      setSales([...sales, { ...data, id: crypto.randomUUID() }]);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (sale: SaleOrder) => {
    setEditingSale(sale);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  const filteredSales = sales.filter(sale => 
    Object.values(sale).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Orders</h1>
        <button
          onClick={() => {
            setEditingSale(undefined);
            setIsFormOpen(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add Sales Order</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search sales orders..."
            className="pl-10 pr-4 py-2 w-full md:w-96 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <SalesTable
          sales={filteredSales}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <SalesOrderForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingSale(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={editingSale}
      />
    </div>
  );
}