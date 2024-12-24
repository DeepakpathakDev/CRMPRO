import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Purchase } from '../../types';

interface PurchaseTableProps {
  purchases: Purchase[];
  onDelete: (id: string) => void;
}

export default function PurchaseTable({ purchases, onDelete }: PurchaseTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              'S.No',
              'Vendor Name',
              'Vendor ID',
              'Purchase Date',
              'Delivery Date',
              'Product Name',
              'Quantity',
              'Unit Price',
              'Total Amount',
              'Payment Status',
              'Actions'
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {purchases.map((purchase, index) => (
            <tr key={purchase.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{index + 1}</td>
              <td className="px-4 py-3 text-sm">{purchase.vendorName}</td>
              <td className="px-4 py-3 text-sm">{purchase.vendorId}</td>
              <td className="px-4 py-3 text-sm">{purchase.purchaseDate}</td>
              <td className="px-4 py-3 text-sm">{purchase.deliveryDate}</td>
              <td className="px-4 py-3 text-sm">{purchase.productName}</td>
              <td className="px-4 py-3 text-sm">{purchase.quantity}</td>
              <td className="px-4 py-3 text-sm">${purchase.unitPrice.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm">${purchase.totalAmount.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(purchase.paymentStatus)}`}>
                  {purchase.paymentStatus}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(purchase.id)}
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