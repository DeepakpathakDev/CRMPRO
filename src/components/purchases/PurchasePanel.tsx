import React, { useState } from 'react';
import { Plus, FileDown, FileUp, Filter } from 'lucide-react';
import PurchaseTable from './PurchaseTable';
import PurchaseForm from './PurchaseForm';
import { Purchase } from '../../types';

export default function PurchasePanel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (data: Omit<Purchase, 'id'>) => {
    setPurchases([...purchases, { ...data, id: crypto.randomUUID() }]);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setPurchases(purchases.filter(purchase => purchase.id !== id));
  };

  const filteredPurchases = purchases.filter((purchase) =>
    Object.values(purchase).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Purchase Orders</h1>
          <p className="text-gray-600">Total Orders: {purchases.length}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Add Purchase</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search purchases..."
          className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <PurchaseTable purchases={filteredPurchases} onDelete={handleDelete} />
      </div>

      <PurchaseForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}