import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { SaleOrder } from '../../types';

interface SalesTableProps {
  sales: SaleOrder[];
  onEdit: (sale: SaleOrder) => void;
  onDelete: (id: string) => void;
}

export default function SalesTable({ sales, onEdit, onDelete }: SalesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">S.No</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">GST Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">GST No</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Entry Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Closer Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Company Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mobile</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Product Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Discount</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">GST</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Address</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sales.map((sale, index) => (
            <tr key={sale.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{index + 1}</td>
              <td className="px-4 py-3 text-sm">{sale.gstType}</td>
              <td className="px-4 py-3 text-sm">{sale.gstNo}</td>
              <td className="px-4 py-3 text-sm">{sale.entryDate}</td>
              <td className="px-4 py-3 text-sm">{sale.closerDate}</td>
              <td className="px-4 py-3 text-sm">{sale.companyName}</td>
              <td className="px-4 py-3 text-sm">{sale.name}</td>
              <td className="px-4 py-3 text-sm">{sale.mobile}</td>
              <td className="px-4 py-3 text-sm">{sale.email}</td>
              <td className="px-4 py-3 text-sm">{sale.productName}</td>
              <td className="px-4 py-3 text-sm">{sale.quantity}</td>
              <td className="px-4 py-3 text-sm">{sale.price}</td>
              <td className="px-4 py-3 text-sm">{sale.discount}</td>
              <td className="px-4 py-3 text-sm">{sale.gst}</td>
              <td className="px-4 py-3 text-sm">{sale.total}</td>
              <td className="px-4 py-3 text-sm">{sale.address}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(sale)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(sale.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}